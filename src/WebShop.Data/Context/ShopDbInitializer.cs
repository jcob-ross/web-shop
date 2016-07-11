namespace WebShop.Data.Context
{
  using System;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Identity;

  public class ShopDbInitializer : IShopDbInitializer
  {
    private readonly PosgresDbContext _dbContext;
    private readonly UserManager<ShopUser> _userManager;

    public ShopDbInitializer(PosgresDbContext dbContext, UserManager<ShopUser> userManager)
    {
      if (null == dbContext)
        throw new ArgumentNullException(nameof(dbContext));
      if (null == userManager)
        throw new ArgumentNullException(nameof(userManager));
      
      _dbContext = dbContext;
      _userManager = userManager;
    }

    public async Task InitializeAsync()
    {
      // this prevents using migations
      await _dbContext.Database.EnsureDeletedAsync();
      await _dbContext.Database.EnsureCreatedAsync();

      await _userManager.CreateAsync(new ShopUser
                                     {
                                       UserName = "admin",
                                       Email = "admin@it.io",
                                       EmailConfirmed = true,
                                     }, "admin");

      await _userManager.CreateAsync(new ShopUser
                                     {
                                       UserName = "user",
                                       Email = "user@it.io",
                                       EmailConfirmed = true,
                                     }, "user");


    }
  }
}