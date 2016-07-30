namespace WebShop.Data.Repositiories
{
  using System;
  using Context;

  public interface ITagRepository
  {
  }

  public sealed class TagRepository : ITagRepository
  {
    private readonly PosgresDbContext _context;

    public TagRepository(PosgresDbContext context)
    {
      if (null == context)
        throw new ArgumentNullException(nameof(context));

      _context = context;
    }
  }
}