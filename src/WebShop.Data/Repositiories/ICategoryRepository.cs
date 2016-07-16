namespace WebShop.Data.Repositiories
{
  using System;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using Context;
  using Entities;

  public interface ICategoryRepository
  {
    Task<List<Category>> ListByGroupAsync(int groupId);
  }

  public class CategoryRepository : ICategoryRepository
  {
    private readonly PosgresDbContext _context;

    public CategoryRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));
      
      _context = context;
    }

    public Task<List<Category>> ListByGroupAsync(int groupId)
    {
      throw new NotImplementedException();
    }
  }
}