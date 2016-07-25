namespace WebShop.Data.Repositiories
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading.Tasks;
  using Context;
  using Entities;
  using Microsoft.EntityFrameworkCore;

  public interface ITagRepository
  {
    Task<Tag> GetTagByIdAsync(int id);
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

    public async Task<Tag> GetTagByIdAsync(int id)
    {
      throw new NotImplementedException();
    }
  }
}