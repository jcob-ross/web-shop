namespace WebShop.Controllers.Api
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading.Tasks;
  using AutoMapper;
  using Data;
  using Data.Context;
  using Data.Entities;
  using Infrastructure.Attributes;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Caching.Memory;
  using Microsoft.Extensions.Logging;

  [Route("api/user")]
  [Produces("application/json")]
  public class UserController : Controller
  {
    private readonly ILogger<UserController> _logger;
    public PosgresDbContext StoreContext { get; }
    public UserManager<ShopUser> UserManager { get; }
    public IMapper Mapper { get; }
    public UserController(
      PosgresDbContext storeContext, 
      UserManager<ShopUser> userManager,
      IMapper mapper,
      ILogger<UserController> logger)
    {
      StoreContext = storeContext;
      UserManager = userManager;
      Mapper = mapper;
      _logger = logger;
    }

    [HttpGet]
    [Route("{userId}", Name = nameof(GetUserById))]
    public async Task<IActionResult> GetUserById(string userId)
    {
      // todo: permissions, logging
      var user = await UserManager.FindByIdAsync(userId);
      if (user == null)
        return NotFound();
      
      var dto = new UserInfoDto
      {
        Id = userId,
        Email = user.Email,
        EmailConfirmed = user.EmailConfirmed,
        IsLockedOut = await UserManager.IsLockedOutAsync(user),
        LockoutEnd = user.LockoutEnd.HasValue ? user.LockoutEnd.Value : default(DateTimeOffset?)
      };

      return Ok(dto);
    }

    [HttpGet]
    [Route("search")]
    public async Task<IActionResult> SearchByEmail([FromQuery]string term)
    {
      if (String.IsNullOrWhiteSpace(term))
      {
        ModelState.AddModelError(nameof(term), "Term cannot be empty.");
        return BadRequest(ModelState);
      }
      
      if (term.Length < 3)
      {
        ModelState.AddModelError(nameof(term), "Term is too short.");
        return BadRequest(ModelState);
      }

      if (term.Length > 20)
      {
        ModelState.AddModelError(nameof(term), "Term is too long.");
        return BadRequest(ModelState);
      }

      var users = await StoreContext.Users.Where(u => u.Email.Contains(term)).ToListAsync();

      var dto = new List<UserInfoDto>();
      foreach(var user in users)
      {
        dto.Add(new UserInfoDto
        {
          Id = user.Id,
          Email = user.Email,
          EmailConfirmed = user.EmailConfirmed,
          IsLockedOut = await UserManager.IsLockedOutAsync(user),
          LockoutEnd = user.LockoutEnd.HasValue ? user.LockoutEnd.Value : default(DateTimeOffset?)
        });
      }

      return Ok(dto);
    }    

    public class UserInfoDto
    {
      public string Id { get; set; }
      public string Email { get; set; }
      public bool EmailConfirmed { get; set; }
      public DateTimeOffset? LockoutEnd { get; set; }
      public bool IsLockedOut { get; set; }
    }
  }
}
