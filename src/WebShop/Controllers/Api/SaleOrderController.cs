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

  [Route("api/order")]
  [Produces("application/json")]
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
    public async Task<IActionResult> ListOrders(
      [FromQuery] int maxAgeDays = 7,
      [FromQuery] bool onlyShipped = false)
    {
      maxAgeDays = Math.Abs(maxAgeDays);
      var startDate = DateTime.UtcNow.Date.Subtract(TimeSpan.FromDays(maxAgeDays));

      var query = StoreContext.SaleOrders
                              .Include(o => o.OrderLines)
                              .Where(o => o.DateCreatedUtc > startDate && !o.Deleted);

      if (onlyShipped)
        query = query.Where(o => o.ShippedOnUtc.HasValue);
      else
        query = query.Where(o => !o.ShippedOnUtc.HasValue);

      var items = await query.ToListAsync();

      return Ok(Mapper.Map<List<SaleOrderDto>>(items));
    }

    [HttpGet]
    [Route("user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(string userId)
    {
      var items = await StoreContext.SaleOrders
                                    .Include(o => o.OrderLines)
                                    .Where(o => o.CustomerId == userId && !o.Deleted)
                                    .ToListAsync();

      return Ok(Mapper.Map<List<SaleOrderDto>>(items));
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetOrderById))]
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

      var lines = new List<OrderLine>();

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

      var userId = "e7686347-63bc-4bde-b135-725f16c6e16d";
      var item = new SaleOrder {
        CustomerId = userId,
        DateCreatedUtc = DateTime.UtcNow,
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

      if (order.CancelledOnUtc.HasValue)
      {
        var cancelledDate = order.CancelledOnUtc;
        ModelState.AddModelError(nameof(id), $"Order is already cancelled. (As of {cancelledDate})");
        return BadRequest(ModelState);
      }

      if (order.ShippedOnUtc.HasValue)
      {
        var shippedDate = order.ShippedOnUtc;
        ModelState.AddModelError(nameof(id), $"Cannot cancel shipped order. (Shipped as of {shippedDate})");
        return BadRequest(ModelState);
      }


      order.CancelledOnUtc = DateTime.UtcNow;
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

      if (order.AcceptedOnUtc.HasValue)
      {
        var acceptedDate = order.AcceptedOnUtc;
        ModelState.AddModelError(nameof(id), $"Order is already accepted. (As of {acceptedDate})");
        return BadRequest(ModelState);
      }

      order.AcceptedOnUtc = DateTime.UtcNow;
      order.CancelledOnUtc = null;
      order.ShippedOnUtc = null;
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

      if (order.ShippedOnUtc.HasValue)
      {
        var shippedDate = order.ShippedOnUtc;
        ModelState.AddModelError(nameof(id), $"Order is already shipped. (As of {shippedDate})");
        return BadRequest(ModelState);
      }

      if (!order.AcceptedOnUtc.HasValue)
      {
        ModelState.AddModelError(nameof(id), $"Order must first be accepted before shipping");
        return BadRequest(ModelState);
      }


      order.ShippedOnUtc = DateTime.UtcNow;
      order.CancelledOnUtc = null;
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
        var deletedDate = item.DeletedOnUtc;
        ModelState.AddModelError(nameof(id), $"Item is already deleted. (As of {deletedDate})");
        return BadRequest(ModelState);
      }

      item.Deleted = true;
      item.DeletedBy = "fantomas";
      item.DeletedOnUtc = DateTime.UtcNow;

      StoreContext.SaleOrders.Update(item);
      await StoreContext.SaveChangesAsync();
      return NoContent();
    }
  }
}