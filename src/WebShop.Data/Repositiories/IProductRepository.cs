namespace WebShop.Data.Repositiories
{
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Context;
  using Entities;

  public interface IProductRepository
  {
    Task<List<Product>> SearchAsync(string term, int limit);
  }

  public class ProductRepository : IProductRepository
  {
    private readonly PosgresDbContext _context;

    public ProductRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));
      
      _context = context;
    }

    public Task<List<Product>> SearchAsync(string term, int limit)
    {
      throw new System.NotImplementedException();
    }
  }
}