namespace WebShop.Controllers.Api
{
  using System;
  using System.Collections.Generic;
  using Microsoft.AspNetCore.Mvc;
  using System.Linq;
  using System.Threading.Tasks;
  using AutoMapper;
  using Data;
  using Data.Context;
  using Data.Entities;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Logging;
  using Infrastructure.Attributes;

  [Route("api/order")]
  [Produces("application/json")]
  [Authorize("ContentEditors")]
  public class SaleOrderController : Controller
  {
    private readonly ILogger<SaleOrderController> _logger;
    public PosgresDbContext StoreContext { get; }
    public UserManager<ShopUser> UserManager { get; }
    public IMapper Mapper { get; }

    public SaleOrderController(PosgresDbContext storeContext, UserManager<ShopUser> userManager, 
      IMapper mapper, ILogger<SaleOrderController> logger)
    {
      StoreContext = storeContext;
      UserManager = userManager;
      Mapper = mapper;
      _logger = logger;
    }

    [HttpGet]
    [Route("list")]
    [NoCache]
    public async Task<IActionResult> ListOrders(
      [FromQuery] int maxAgeDays = 7,
      [FromQuery] bool onlyShipped = false)
    {
      maxAgeDays = Math.Abs(maxAgeDays);
      var startDate = DateTimeOffset.UtcNow.Date.Subtract(TimeSpan.FromDays(maxAgeDays));

      var query = StoreContext.SaleOrders
                              .Include(o => o.OrderLines)
                              .Where(o => o.DateCreated > startDate && !o.Deleted);

      if (onlyShipped)
        query = query.Where(o => o.ShippedOn.HasValue);

      var items = await query.OrderByDescending(o => o.DateCreated).ToListAsync();

      return Ok(Mapper.Map<List<SaleOrderDto>>(items));
    }

    [HttpGet]
    [Route("user/{userId}")]
    [NoCache]
    public async Task<IActionResult> GetOrdersByUserId(string userId, [FromQuery] int maxAgeDays = 7)
    {
      maxAgeDays = Math.Abs(maxAgeDays);
      var startDate = DateTimeOffset.UtcNow.Date.Subtract(TimeSpan.FromDays(maxAgeDays));

      var items = await StoreContext.SaleOrders
                                    .Include(o => o.OrderLines)
                                    .Where(o => o.CustomerId == userId && o.DateCreated > startDate && !o.Deleted)
                                    .ToListAsync();

      return Ok(Mapper.Map<List<SaleOrderDto>>(items));
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetOrderById))]
    [NoCache]
    public async Task<IActionResult> GetOrderById(int id)
    {
      var item = await StoreContext.SaleOrders.Include(o => o.OrderLines)
                                   .FirstOrDefaultAsync(o => o.Id == id && !o.Deleted);
      if (item == null)
        return NotFound();

      return Ok(Mapper.Map<SaleOrderDto>(item));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SaleOrderDto model)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var user = await UserManager.GetUserAsync(User);
      if (user == null)
      {
        _logger.LogError("Could not extract user from claims principal.");
        ModelState.AddModelError(nameof(User), "User not found");
      }

      var lines = new HashSet<OrderLine>();

      foreach(var line in model.OrderLines)
      {
        var orderLine = new OrderLine
        {
          ProductId = line.ProductId,
          Quantity = line.Quantity
        };
        lines.Add(orderLine);
      }
      StoreContext.OrderLines.AddRange(lines);

      var userId = user.Id;
      var item = new SaleOrder {
        CustomerId = userId,
        DateCreated = DateTimeOffset.UtcNow,
        OrderLines = lines
      };
      StoreContext.SaleOrders.Add(item);
      await StoreContext.SaveChangesAsync();

      var dto = Mapper.Map<SaleOrderDto>(item);
      return CreatedAtRoute(nameof(GetOrderById), new { controller = nameof(SaleOrderController), id = item.Id }, dto);
    }

    [HttpPut]
    [Route("{id:int}/cancel")]
    public async Task<IActionResult> Cancel(int id)
    {
      var order = await StoreContext.SaleOrders.FirstOrDefaultAsync(o => o.Id == id && !o.Deleted);
      if (order == null)
        return NotFound();

      if (order.CancelledOn.HasValue)
      {
        var cancelledDate = order.CancelledOn;
        ModelState.AddModelError(nameof(id), $"Order is already cancelled. (As of {cancelledDate})");
        return BadRequest(ModelState);
      }

      if (order.ShippedOn.HasValue)
      {
        var shippedDate = order.ShippedOn;
        ModelState.AddModelError(nameof(id), $"Cannot cancel shipped order. (Shipped as of {shippedDate})");
        return BadRequest(ModelState);
      }

      order.CancelledOn = DateTimeOffset.UtcNow;
      order.AcceptedOn = null;
      StoreContext.SaleOrders.Update(order);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<SaleOrderDto>(order));
    }

    [HttpPut]
    [Route("{id:int}/accept")]
    public async Task<IActionResult> Accept(int id)
    {
      var order = await StoreContext.SaleOrders.FirstOrDefaultAsync(o => o.Id == id && !o.Deleted);
      if (order == null)
        return NotFound();

      if (order.AcceptedOn.HasValue)
      {
        var acceptedDate = order.AcceptedOn;
        ModelState.AddModelError(nameof(id), $"Order is already accepted. (As of {acceptedDate})");
        return BadRequest(ModelState);
      }

      order.AcceptedOn = DateTimeOffset.UtcNow;
      order.CancelledOn = null;
      StoreContext.SaleOrders.Update(order);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<SaleOrderDto>(order));
    }

    [HttpPut]
    [Route("{id:int}/ship")]
    public async Task<IActionResult> Ship(int id)
    {
      var order = await StoreContext.SaleOrders.FirstOrDefaultAsync(o => o.Id == id && !o.Deleted);
      if (order == null)
        return NotFound();

      if (order.CancelledOn.HasValue)
      {
        var cancelledDate = order.CancelledOn;
        ModelState.AddModelError(nameof(id), $"Cannot ship cancelled order.");
        return BadRequest(ModelState);
      }

      if (order.ShippedOn.HasValue)
      {
        var shippedDate = order.ShippedOn;
        ModelState.AddModelError(nameof(id), $"Order is already shipped. (As of {shippedDate})");
        return BadRequest(ModelState);
      }

      if (!order.AcceptedOn.HasValue)
      {
        ModelState.AddModelError(nameof(id), $"Order must first be accepted before marking it as shipped");
        return BadRequest(ModelState);
      }

      order.ShippedOn = DateTimeOffset.UtcNow;
      StoreContext.SaleOrders.Update(order);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<SaleOrderDto>(order));
    }

    [HttpPut]
    [Route("{id:int}/mark-as-delivered")]
    public async Task<IActionResult> MarkAsDelivered(int id)
    {
      var order = await StoreContext.SaleOrders.FirstOrDefaultAsync(o => o.Id == id && !o.Deleted);
      if (order == null)
        return NotFound();

      if (!order.AcceptedOn.HasValue)
      {
        ModelState.AddModelError(nameof(id), $"Cannot mark non-accepted order as delivered.");
        return BadRequest(ModelState);
      }

      order.DeliveredOn = DateTimeOffset.UtcNow;
      StoreContext.SaleOrders.Update(order);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<SaleOrderDto>(order));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await StoreContext.SaleOrders.FirstOrDefaultAsync(o => o.Id == id);
      if (item == null)
        return NotFound();

      if (item.Deleted)
      {
        var deletedDate = item.DeletedOn;
        ModelState.AddModelError(nameof(id), $"Item is already deleted. (As of {deletedDate})");
        return BadRequest(ModelState);
      }

      item.Deleted = true;
      item.DeletedBy = "fantomas";
      item.DeletedOn = DateTimeOffset.UtcNow;

      StoreContext.SaleOrders.Update(item);
      await StoreContext.SaveChangesAsync();
      return NoContent();
    }
  }
}