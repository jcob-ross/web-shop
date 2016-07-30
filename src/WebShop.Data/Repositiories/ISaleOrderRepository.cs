namespace WebShop.Data.Repositiories
{
  using System;
  using Context;

  public interface ISaleOrderRepository
  {
  }

  public sealed class SaleOrderRepository : ISaleOrderRepository
  {
    private readonly PosgresDbContext _context;

    public SaleOrderRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));

      _context = context;
    }
  }
}