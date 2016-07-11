namespace WebShop.Data.Context
{
  using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
  using Microsoft.EntityFrameworkCore;

  public class PosgresDbContext : IdentityDbContext<ShopUser>
  {
    public PosgresDbContext(DbContextOptions<PosgresDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
    }
  }
}