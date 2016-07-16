namespace WebShop.Infrastructure.Authentication
{
  using System;
  using System.Security.Claims;
  using Data;
  using Microsoft.AspNetCore.Authentication.Cookies;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.Extensions.DependencyInjection;

  public static class ShopCookieAuthentication
  {
    public static ICookieAuthenticationEvents CreateCookieEvents()
    {
      return new CookieAuthenticationEvents
      {
        OnValidatePrincipal = async ctx =>
        {
          Console.WriteLine($"OnValidatePrincipal: - ");
          if (ctx.Principal.Identity != null && ctx.Principal.Identity.IsAuthenticated)
          {
            var userManager = ctx.Request.HttpContext.RequestServices.GetRequiredService<UserManager<ShopUser>>();
            var user = await userManager.GetUserAsync(ctx.Principal);
            if (user != null)
            {
              var email = await userManager.GetEmailAsync(user);
              var emailClaim = new Claim(ClaimTypes.Email, email);

              ((ClaimsIdentity)ctx.Principal.Identity).AddClaim(emailClaim);
            }
          }
        }
      };
    }
  }
}