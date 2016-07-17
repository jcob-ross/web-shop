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
    public async Task<IActionResult> ListOrders([FromQuery] int maxAgeDays = 7,
      [FromQuery] bool includeAccepted = true, [FromQuery] bool includeShipped = false)
    {
      maxAgeDays = Math.Abs(maxAgeDays);

      var query = StoreContext.SaleOrders
                              .Include(o => o.OrderLines)
                              .Where(o => o.DateCreatedUtc >= DateTime.UtcNow - TimeSpan.FromDays(maxAgeDays));

      if (includeAccepted)
        query = query.Where(o => o.AcceptedOnUtc != null);
      else
        query = query.Where(o => o.AcceptedOnUtc == null);

      if (includeShipped)
        query = query.Where(o => o.ShippedOnUtc != null);
      else
        query = query.Where(o => o.ShippedOnUtc == null);

      var items = await query.ToListAsync();

      return Ok(Mapper.Map<IEnumerable<SaleOrderDto>>(items));
    }

    [HttpGet]
    [Route("user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(string userId)
    {
      var items = await StoreContext.SaleOrders
                                    .Include(o => o.OrderLines)
                                    .Where(o => o.CustomerId == userId)
                                    .ToListAsync();

      return Ok(Mapper.Map<IEnumerable<SaleOrderDto>>(items));
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetOrderById))]
    public async Task<IActionResult> GetOrderById(int id)
    {
      var item = await StoreContext.SaleOrders.Include(o => o.OrderLines)
                                   .FirstOrDefaultAsync(o => o.Id == id);
      if (item == null)
      {
        ModelState.AddModelError(nameof(id), "Order not found");
        return BadRequest(ModelState);
      }

      return Ok(Mapper.Map<SaleOrderDto>(item));
    }


    [HttpPut]
    [Route("{id:int}/cancel")]
    [Authorize]
    public async Task<IActionResult> Cancel(int id)
    {
      var user = await UserManager.GetUserAsync(User);
      if (user == null)
      {
        _logger.LogError(11, "User not found!");
        ModelState.AddModelError(nameof(User), "User not found");
        return BadRequest(ModelState);
      }

      var order = await StoreContext.SaleOrders.FirstOrDefaultAsync(o => o.Id == id);
      if (order == null)
        return NotFound();

      // todo: order cancellation authorization
      // https://github.com/blowdart/AspNetAuthorizationWorkshop
      if (order.CustomerId != user.Id)
      {
        ModelState.AddModelError(nameof(id), "Only order owner can cancel an order");
        return BadRequest(ModelState);
      }

      order.CancelledOnUtc = DateTime.UtcNow;
      StoreContext.SaleOrders.Update(order);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<SaleOrderDto>(order));
    }

  }
}