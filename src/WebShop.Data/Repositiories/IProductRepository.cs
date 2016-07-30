namespace WebShop.Data.Repositiories
{
  using System;
  using Context;

  public interface IProductRepository
  {
  }

  public sealed class ProductRepository : IProductRepository
  {
    private readonly PosgresDbContext _context;

    public ProductRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));

      _context = context;
    }
  }
}