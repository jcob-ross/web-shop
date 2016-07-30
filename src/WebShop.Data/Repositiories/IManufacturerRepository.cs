namespace WebShop.Data.Repositiories
{
  using System;
  using Context;

  public interface IManufacturerRepository
  {
  }

  public sealed class ManufacturerRepository : IManufacturerRepository
  {
    private readonly PosgresDbContext _context;

    public ManufacturerRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));

      _context = context;
    }
  }
}