namespace WebShop.Controllers.Api
{
  using System.Collections.Generic;
  using System.Threading.Tasks;
  using AutoMapper;
  using Data.Context;
  using Data.Entities;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.EntityFrameworkCore;
  using System.Linq;

  [Route("api/tag")]
  [Produces("application/json")]
  public class TagController : Controller
  {
    public PosgresDbContext Context { get; }
    public IMapper Mapper { get; }

    public TagController(PosgresDbContext context, IMapper mapper)
    {
      Context = context;
      Mapper = mapper;
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetTagById))]
    public async Task<IActionResult> GetTagById(int id)
    {
      var item = await Context.Tags
                              .Include(t => t.ProductTags)
                              .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      var dto = Mapper.Map<TagDto>(item);
      dto.ProductCount = item.ProductTags.Count;
      return Ok(dto);
    }

    [HttpGet]
    [Route("list/category/{categoryId:int}")]
    public async Task<IActionResult> GetTagsByCategory(int categoryId)
    {
      var items = await Context.Categories
                                    .Include(s => s.Tags)
                                    .Where(s => s.Id == categoryId)
                                    .Select(s => s.Tags)
                                    .FirstOrDefaultAsync();
      if (items == null)
      {
        ModelState.AddModelError(nameof(categoryId), "Category not found");
        return BadRequest(ModelState);
      }

      var dto = Mapper.Map<IEnumerable<TagDto>>(items);
      return Ok(dto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TagDto model)
    {
      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var parentCategory = await Context.Categories
                                        .Include(s => s.Tags)
                                        .FirstOrDefaultAsync(t => t.Id == model.ParentCategoryId);
      if (parentCategory == null)
      {
        ModelState.AddModelError(nameof(model.ParentCategoryId), "Specified category not found");
        return BadRequest(ModelState);
      }

      var item = new Tag();
      item.Name = model.Name;
      item.UrlSegment = model.UrlSegment;
      item.ShowInMainMenu = model.ShowInMainMenu;
      item.ParentCategory = parentCategory;
      item.ParentCategoryId = parentCategory.Id;

      var dto = Mapper.Map<TagDto>(item);
      return CreatedAtRoute(nameof(GetTagById), new {controller = nameof(TagController), id = item.Id}, dto);
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TagDto model)
    {
      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var item = await Context.Tags
                              .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      item.Name = model.Name;
      item.UrlSegment = model.UrlSegment;
      item.ShowInMainMenu = model.ShowInMainMenu;

      Context.Tags.Update(item);
      await Context.SaveChangesAsync();

      var dto = Mapper.Map<TagDto>(item);
      dto.ProductCount = item.ProductTags.Count();

      return Ok(dto);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      var tag = await Context.Tags
                             .Include(t => t.ProductTags).ThenInclude(pt => pt.Product)
                             .FirstOrDefaultAsync(t => t.Id == id);

      if (tag == null)
      {
        ModelState.AddModelError(nameof(id), "Tag not found");
        return BadRequest(ModelState);
      }

      Context.Tags.Remove(tag);

      await Context.SaveChangesAsync();
      return NoContent();
    }
  }
}