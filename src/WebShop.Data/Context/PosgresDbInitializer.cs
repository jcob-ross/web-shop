namespace WebShop.Data.Context
{
  using System;
  using System.Threading.Tasks;
  using Entities;
  using Microsoft.AspNetCore.Identity;

  public class PosgresDbInitializer : IDbInitializer
  {
    private readonly PosgresDbContext _dbContext;
    private readonly UserManager<ShopUser> _userManager;

    public PosgresDbInitializer(PosgresDbContext dbContext, UserManager<ShopUser> userManager)
    {
      if (null == dbContext)
        throw new ArgumentNullException(nameof(dbContext));
      if (null == userManager)
        throw new ArgumentNullException(nameof(userManager));
      
      _dbContext = dbContext;
      _userManager = userManager;
    }

    public void Initialize()
    {
      // todo: migrations
      // this prevents using migations
      _dbContext.Database.EnsureDeleted();
      _dbContext.Database.EnsureCreated();

      _userManager.CreateAsync(new ShopUser
                               {
                                 UserName = "admin",
                                 Email = "admin@it.io",
                                 EmailConfirmed = true,
                               }, "admin").Wait();

      _userManager.CreateAsync(new ShopUser
                               {
                                 UserName = "user",
                                 Email = "user@it.io",
                                 EmailConfirmed = true,
                               }, "user").Wait();


      var cat = new Category
                {
                  Name = "Category",
                  UrlSegment = "category",
                  ImageUrl = "https://placeholdit.imgix.net/~text?txtsize=33&txt=50%C3%97100&w=50&h=100",
                  ViewDisplayOrder = 1
                };
      _dbContext.Categories.Add(cat);

      var tagAwesome = new Tag
                       {
                         Name = "awesome",
                         UrlSegment = "awesome",
                         ShowInMainMenu = true,

                         ParentCategory = cat
                       };
      _dbContext.Tags.Add(tagAwesome);

      var man = new Manufacturer
                {
                  Name = "Ota",
                  UrlSegment = "ota",
                  ShowInMainMenu = true,

                  ParentCategory = cat
                };
      _dbContext.Manufacturers.Add(man);

      var prod = new Product
                 {
                   Name = "Ring of Void",
                   Description = "Brass rinn",
                   NewProduct = true,
                   ParentCategory = cat,
                   Price = 9999M,
                   CurrentPrice = 9999M,
                   ImageUrl = "https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%9750&w=150&h=50",
                   Manufacturer = man,
                   PromoActive = true,
                   StockCount = 3
                 };
      var productTag = new ProductTag
                       {
                         Product = prod,
                         Tag = tagAwesome
                       };
      _dbContext.Products.Add(prod);
      _dbContext.ProductTag.Add(productTag);
      prod.ProductTags.Add(productTag);

      _dbContext.SaveChanges();
    }
  }
}