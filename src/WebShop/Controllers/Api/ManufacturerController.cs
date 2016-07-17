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

  [Route("api/manufacturer")]
  [Produces("application/json")]
  public class ManufacturerController : Controller
  {
    public PosgresDbContext StoreContext { get; }
    public IMapper Mapper { get; }

    public ManufacturerController(PosgresDbContext storeContext, IMapper mapper)
    {
      StoreContext = storeContext;
      Mapper = mapper;
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetManufacturerById))]
    public async Task<IActionResult> GetManufacturerById(int id)
    {
      var item = await StoreContext.Manufacturers
                                   .Include(m => m.Products)
                                   .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      return Ok(Mapper.Map<ManufacturerDto>(item));
    }

    [HttpGet]
    [Route("list/category/{categoryId:int}")]
    public async Task<IActionResult> GetManufacturersBySubcategory(int categoryId)
    {
      var items = await StoreContext.Manufacturers
                                    .Where(s => s.ParentCategoryId == categoryId)
                                    .ToListAsync();

      return Ok(Mapper.Map<IEnumerable<ManufacturerDto>>(items));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ManufacturerDto model)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var parentCategory = await StoreContext.Categories
                                             .Include(s => s.Manufacturers)
                                             .FirstOrDefaultAsync(s => s.Id == model.ParentCategoryId);

      if (parentCategory == null)
      {
        ModelState.AddModelError(nameof(model.ParentCategoryId), "Category not found.");
        return BadRequest(ModelState);
      }

      var item = new Manufacturer();
      item.Name = model.Name;
      item.UrlSegment = model.UrlSegment;
      item.ShowInMainMenu = model.ShowInMainMenu;
      item.ParentCategory = parentCategory;

      StoreContext.Manufacturers.Add(item);
      parentCategory.Manufacturers.Add(item);
      await StoreContext.SaveChangesAsync();

      return CreatedAtRoute(nameof(GetManufacturerById), new { controller = nameof(ManufacturerController), id = item.Id },
                            Mapper.Map<ManufacturerDto>(item));
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ManufacturerDto model)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var item = await StoreContext.Manufacturers.FirstOrDefaultAsync(m => m.Id == id);
      if (item == null)
        return NotFound();

      item.Name = model.Name;
      item.UrlSegment = model.UrlSegment;
      item.ShowInMainMenu = model.ShowInMainMenu;
      StoreContext.Manufacturers.Update(item);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<ManufacturerDto>(item));
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await StoreContext.Manufacturers
                                   .Include(m => m.Products)
                                   .Include(m => m.ParentCategory)
                                   .FirstOrDefaultAsync(m => m.Id == id);
      if (item == null)
        return NotFound();

      item.ParentCategory.Manufacturers.Remove(item);
      StoreContext.Manufacturers.Remove(item);
      await StoreContext.SaveChangesAsync();
      return NoContent();
    }
  }
}