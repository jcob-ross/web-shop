namespace WebShop.Data.Context
{
  using Entities;
  using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.EntityFrameworkCore.Metadata;

  public class PosgresDbContext : IdentityDbContext<ShopUser>
  {
    public const long MinProductNumber = 1000000;
    public const long MaxProductNumber = 9999999;

    public PosgresDbContext(DbContextOptions<PosgresDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductDetail> ProductDetails { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<ProductTag> ProductTag { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Manufacturer> Manufacturers { get; set; }
    public DbSet<SaleOrder> SaleOrders { get; set; }
    public DbSet<OrderLine> OrderLines { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.HasSequence<long>("product_numbers")
             .HasMin(MinProductNumber)
             .HasMax(MaxProductNumber)
             .StartsAt(MinProductNumber)
             .IncrementsBy(1)
             .IsCyclic();

      #region category

      builder.Entity<Category>()
             .HasKey(c => c.Id);

      builder.Entity<Category>()
             .Property(c => c.Name)
             .IsRequired();

      builder.Entity<Category>()
             .Property(c => c.UrlSegment)
             .IsRequired();

      builder.Entity<Category>()
             .Property(c => c.CategoryGroup)
             .IsRequired();

      builder.Entity<Category>()
             .HasIndex(c => c.CategoryGroup);

      builder.Entity<Category>()
             .Property(c => c.ViewDisplayOrder)
             .IsRequired();

      builder.Entity<Category>()
             .HasMany(c => c.Products)
             .WithOne(p => p.ParentCategory)
             .HasForeignKey(p => p.ParentCategoryId)
             .IsRequired()
             .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Category>()
             .HasMany(c => c.Manufacturers)
             .WithOne(m => m.ParentCategory)
             .HasForeignKey(m => m.ParentCategoryId)
             .IsRequired()
             .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Category>()
             .HasMany(c => c.Tags)
             .WithOne(t => t.ParentCategory)
             .HasForeignKey(t => t.ParentCategoryId)
             .IsRequired()
             .OnDelete(DeleteBehavior.Cascade);

      #endregion category

      #region manufacturer

      builder.Entity<Manufacturer>()
             .HasKey(m => m.Id);

      builder.Entity<Manufacturer>()
             .Property(m => m.Name)
             .IsRequired();

      builder.Entity<Manufacturer>()
             .Property(m => m.UrlSegment)
             .IsRequired();

      builder.Entity<Manufacturer>()
             .Property(m => m.ShowInMainMenu)
             .IsRequired();

      builder.Entity<Manufacturer>()
             .HasOne(m => m.ParentCategory)
             .WithMany(c => c.Manufacturers)
             .HasForeignKey(m => m.ParentCategoryId)
             .IsRequired();

      builder.Entity<Manufacturer>()
             .HasMany(m => m.Products)
             .WithOne(p => p.Manufacturer);

      #endregion manufacturer

      #region sale order

      builder.Entity<SaleOrder>()
             .HasKey(o => o.Id);

      builder.Entity<SaleOrder>()
             .Property(o => o.CustomerId)
             .IsRequired();

      builder.Entity<SaleOrder>()
             .HasIndex(o => o.CustomerId);
      
      builder.Entity<SaleOrder>()
             .Property(o => o.DateCreatedUtc)
             .IsRequired();

      builder.Entity<SaleOrder>()
             .HasMany(o => o.OrderLines);

      #endregion sale order

      #region order line

      builder.Entity<OrderLine>()
             .HasKey(l => l.Id);

      builder.Entity<OrderLine>()
             .Property(l => l.ProductId)
             .IsRequired();
      
      #endregion order line

      #region tag

      builder.Entity<Tag>()
             .HasKey(t => t.Id);

      builder.Entity<Tag>()
             .Property(t => t.Name)
             .IsRequired();

      builder.Entity<Tag>()
             .Property(t => t.UrlSegment)
             .IsRequired();

      builder.Entity<Tag>()
             .Property(t => t.ShowInMainMenu)
             .IsRequired();

      builder.Entity<Tag>()
             .HasOne(t => t.ParentCategory)
             .WithMany(c => c.Tags)
             .HasForeignKey(t => t.ParentCategoryId);

      #endregion tag

      #region products-tags - many to many mapping

      // http://ef.readthedocs.io/en/latest/modeling/relationships.html#many-to-many

      builder.Entity<ProductTag>()
             .HasKey(pt => new {pt.ProductId, pt.TagId});

      builder.Entity<ProductTag>()
             .HasOne(pt => pt.Product)
             .WithMany(p => p.ProductTags)
             .HasForeignKey(pt => pt.ProductId);

      builder.Entity<ProductTag>()
             .HasOne(pt => pt.Tag)
             .WithMany(t => t.ProductTags)
             .HasForeignKey(pt => pt.TagId);

      #endregion products-tags many to many mapping

      #region product

      builder.Entity<Product>()
             .HasKey(p => p.Id);

      builder.Entity<Product>()
             .Property(p => p.Name)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.Description)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.StockCount)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.Price)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.CurrentPrice)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.ProductNumber)
             .HasDefaultValueSql("nextval('product_numbers')");

      builder.Entity<Product>()
             .Property(p => p.ImageUrl)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.NewProduct)
             .IsRequired();

      builder.Entity<Product>()
             .Property(p => p.PromoActive)
             .IsRequired();


      builder.Entity<Product>()
             .HasOne(p => p.ProductDetail)
             .WithOne(d => d.ParentProduct)
             .HasForeignKey<ProductDetail>(d => d.ParentProductId)
             .IsRequired();

      builder.Entity<Product>()
             .HasOne(p => p.Manufacturer)
             .WithMany(m => m.Products)
             .IsRequired();

      builder.Entity<Product>()
             .HasOne(p => p.ParentCategory)
             .WithMany(c => c.Products)
             .HasForeignKey(p => p.ParentCategoryId)
             .IsRequired();

      #endregion product

      #region product detail

      builder.Entity<ProductDetail>()
             .HasKey(d => d.Id);

      #endregion product detail

      base.OnModelCreating(builder);
    }
  }
}