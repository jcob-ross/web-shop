namespace WebShop.Data.Repositiories
{
  using System;
  using Context;

  public interface ICategoryRepository
  {
  }

  public sealed class CategoryRepository : ICategoryRepository
  {
    private readonly PosgresDbContext _context;

    public CategoryRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));

      _context = context;
    }
  }
}