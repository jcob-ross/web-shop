namespace WebShop.Data.Repositiories
{
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Context;
  using Entities;

  public interface IManufacturerRepository
  {
    Task<Manufacturer> GetManufacturerByIdAsync(int id);
  }

  public class ManufacturerRepository : IManufacturerRepository
  {
    private readonly PosgresDbContext _context;

    public ManufacturerRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));
      
      _context = context;
    }

    public Task<Manufacturer> GetManufacturerByIdAsync(int id)
    {
      throw new System.NotImplementedException();
    }
  }
}