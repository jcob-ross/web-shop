namespace WebShop.Data.Context
{
    using System;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;

    public sealed class PosgresDbInitializer : IDbInitializer
  {
    private readonly ILogger _logger;
    private readonly PosgresDbContext _dbContext;
    private readonly UserManager<ShopUser> _userManager;

    public PosgresDbInitializer(PosgresDbContext dbContext, UserManager<ShopUser> userManager, ILogger<PosgresDbInitializer> logger)
    {
      if (null == dbContext)
        throw new ArgumentNullException(nameof(dbContext));
      if (null == userManager)
        throw new ArgumentNullException(nameof(userManager));
      if (null == logger)
        throw new ArgumentNullException(nameof(logger));
      
      _dbContext = dbContext;
      _userManager = userManager;
      _logger = logger;
    }

    public void Initialize(IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        _logger.LogInformation("Recreating database");
        _dbContext.Database.EnsureDeleted();
      }

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
                  Name = "Rings",
                  UrlSegment = "rings",
                  ImageUrl = "https://placeholdit.imgix.net/~text?txtsize=33&txt=50%C3%97100&w=50&h=100",
                  ViewDisplayOrder = 1
                };
      _dbContext.Categories.Add(cat);

      var tagPrecious = new Tag
                       {
                         Name = "Precious",
                         UrlSegment = "precious",
                         ShowInMainMenu = true,

                         ParentCategory = cat
                       };
      _dbContext.Tags.Add(tagPrecious);

      var man = new Manufacturer
                {
                  Name = "Sauron @ Mount Doom LLC.",
                  UrlSegment = "mnt-doom",
                  ShowInMainMenu = true,

                  ParentCategory = cat
                };
      _dbContext.Manufacturers.Add(man);

      var prod = new Product
                 {
                   Name = "The One Ring",
                   Description = "One ring to rule them all.",
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
                         Tag = tagPrecious
                       };
      _dbContext.Products.Add(prod);
      _dbContext.ProductTag.Add(productTag);
      prod.ProductTags.Add(productTag);

      _dbContext.SaveChanges();
    }
  }
}