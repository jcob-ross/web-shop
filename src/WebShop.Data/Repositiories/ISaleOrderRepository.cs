namespace WebShop.Data.Repositiories
{
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Context;
  using Entities;

  public interface ISaleOrderRepository
  {
    Task<SaleOrder> GetOrderByIdAsync(int id);
  }

  public class SaleOrderRepository : ISaleOrderRepository
  {
    private readonly PosgresDbContext _context;

    public SaleOrderRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));
      
      _context = context;
    }

    public Task<SaleOrder> GetOrderByIdAsync(int id)
    {
      throw new NotImplementedException();
    }
  }
}