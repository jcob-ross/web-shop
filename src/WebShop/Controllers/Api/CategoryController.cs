namespace WebShop.Controllers.Api
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Threading.Tasks;
  using AutoMapper;
  using Data.Context;
  using Data.Entities;
  using Infrastructure.Attributes;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Caching.Memory;

  [Route("api/category")]
  [Produces("application/json")]
  public class CategoryController : Controller
  {
    public CategoryController(PosgresDbContext storeContext, IMapper mapper, IMemoryCache cache)
    {
      StoreContext = storeContext;
      Mapper = mapper;
      Cache = cache;
    }

    public PosgresDbContext StoreContext { get; }
    public IMapper Mapper { get; }
    public IMemoryCache Cache { get; set; }

    [HttpGet]
    [Route("{categoryUrlSegment}/metadata")]
    [NoCache]
    public async Task<IActionResult> Metadata(string categoryUrlSegment)
    {
      if (String.IsNullOrWhiteSpace(categoryUrlSegment))
      {
        ModelState.AddModelError(nameof(categoryUrlSegment), "Category must be specified");
        return BadRequest(ModelState);
      }

      Category category = await StoreContext.Categories
                                            .Include(s => s.Products)
                                            .Include(s => s.Tags).ThenInclude(t => t.ProductTags)
                                            .FirstOrDefaultAsync(s => s.UrlSegment == categoryUrlSegment);

      if (category == null)
        return NotFound();

      var manufacturersDto = await StoreContext.Manufacturers
                                               .Include(m => m.Products)
                                               .Where(m => m.ParentCategoryId == category.Id)
                                               .OrderByDescending(m => m.Products.Count)
                                               .Select(m => new ManufacturerDto
                                                            {
                                                              Id = m.Id,
                                                              Name = m.Name,
                                                              UrlSegment = m.UrlSegment,
                                                              ShowInMainMenu = m.ShowInMainMenu,
                                                              ProductCount = m.Products.Count,
                                                              ParentCategoryId = m.ParentCategoryId
                                                            }).ToListAsync();
      int promoCount = await StoreContext.Products
                                         .CountAsync(p => p.ParentCategoryId == category.Id &&
                                                          p.PromoActive);

      int newProductCount = await StoreContext.Products
                                              .CountAsync(p => p.ParentCategoryId == category.Id &&
                                                               p.NewProduct);

      var tagList = new List<TagDto>();
      foreach (Tag tag in category.Tags)
      {
        var newDto = Mapper.Map<TagDto>(tag);
        newDto.ProductCount = tag.ProductTags.Count;
        tagList.Add(newDto);
      }

      var categoryDto = new CategoryDto
                        {
                          Id = category.Id,
                          Name = category.Name,
                          UrlSegment = category.UrlSegment,
                          ImageUrl = category.ImageUrl,
                          ViewDisplayOrder = category.ViewDisplayOrder
                        };

      bool anyProducts = category.Products.Count > 0;
      decimal minPrice = anyProducts ? category.Products.Min(p => p.CurrentPrice) : 0;
      decimal maxPrice = anyProducts ? category.Products.Max(p => p.CurrentPrice) : 0;

      var result = new
                   {
                     category = categoryDto,
                     itemCount = category.Products.Count,
                     minPrice,
                     maxPrice,
                     promoCount,
                     newProductCount,
                     manufacturers = manufacturersDto,
                     tags = tagList.OrderByDescending(t => t.ProductCount).ToList()
                   };

      return Ok(result);
    }

    [HttpGet]
    [Route("list")]
    [NoCache]
    public async Task<IActionResult> List([FromQuery] bool includeTags = false,
                                          [FromQuery] bool includeManufacturers = false)
    {
      var query = StoreContext.Categories.AsQueryable();

      if (includeTags)
        query = query.Include(s => s.Tags);

      if (includeManufacturers)
        query = query.Include(s => s.Manufacturers);

      // var items = await query
      //   .GroupBy(c => c.CategoryGroup)
      //   .Select(g => new
      //                {
      //                  groupName = g.Key,
      //                  items = Mapper.Map<IEnumerable<CategoryDto>>(g.OrderBy(c => c.ViewDisplayOrder).ToList())
      //                })
      //   .ToListAsync();

      var items = await query.ToListAsync();

      return Ok(Mapper.Map<IEnumerable<CategoryDto>>(items));
    }


    [HttpGet]
    [Route("list-groups")]
    [NoCache]
    public async Task<IActionResult> ListGroups()
    {
      var items = await StoreContext.Categories.Select(c => c.CategoryGroup).Distinct().ToListAsync();
      return Ok(items);
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetCategoryById))]
    [NoCache]
    public async Task<IActionResult> GetCategoryById(int id)
    {
      Category item = await StoreContext.Categories
                                        .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      return Ok(Mapper.Map<CategoryDto>(item));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryDto model)
    {
      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var item = new Category
                 {
                   Name = model.Name,
                   UrlSegment = model.UrlSegment,
                   CategoryGroup = model.CategoryGroup,
                   ImageUrl = model.ImageUrl,
                   ViewDisplayOrder = model.ViewDisplayOrder
                 };

      StoreContext.Categories.Add(item);
      await StoreContext.SaveChangesAsync();

      return CreatedAtRoute(nameof(GetCategoryById), new {controller = nameof(CategoryController), id = item.Id},
                            Mapper.Map<CategoryDto>(item));
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryDto model)
    {
      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      Category item = await StoreContext.Categories
                                        .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      item.Name = model.Name;
      item.UrlSegment = model.UrlSegment;
      item.CategoryGroup = model.CategoryGroup;
      item.ImageUrl = model.ImageUrl;
      item.ViewDisplayOrder = model.ViewDisplayOrder;

      StoreContext.Categories.Update(item);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<CategoryDto>(item));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      Category item = await StoreContext.Categories.FirstOrDefaultAsync(p => p.Id == id);
      if (item == null)
        return NotFound();

      StoreContext.Categories.Remove(item);
      await StoreContext.SaveChangesAsync();
      return NoContent();
    }
  }
}