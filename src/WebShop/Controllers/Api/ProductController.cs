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
  using Microsoft.Extensions.Logging;

  [Route("api/product")]
  [Produces("application/json")]
  public class ProductController : Controller
  {
    private readonly ILogger<ProductController> _logger;
    public PosgresDbContext StoreContext { get; }
    public IMapper Mapper { get; }

    public ProductController(PosgresDbContext storeContext, IMapper mapper, ILogger<ProductController> logger)
    {
      StoreContext = storeContext;
      Mapper = mapper;
      _logger = logger;
    }

    [HttpGet]
    [Route("search")]
    [NoCache]
    public async Task<IActionResult> SearchByTitle([FromQuery] string term, [FromQuery] int count = 6)
    {
      if (string.IsNullOrWhiteSpace(term))
        return BadRequest();

      if (count < 1 || count > 20)
        count = 3;

      term = term.Trim();

      var items = await StoreContext.Products
                                    .Include(p => p.Manufacturer)
                                    .Include(p => p.ParentCategory)
                                    .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                                    .Where(p => p.Name.Contains(term) || p.Description.Contains(term))
                                    .Take(count)                                    
                                    .ToListAsync();

      var dto = Mapper.Map<List<ProductDto>>(items);
      return Ok(dto);
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetProductById))]
    [NoCache]
    public async Task<ActionResult> GetProductById(int id)
    {
      var item = await StoreContext.Products
        .Include(p => p.ParentCategory)
        .Include(p => p.Manufacturer)
        .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
        .SingleOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();
      
      var dto = Mapper.Map<ProductDto>(item);
      return Ok(dto);
    }

    [HttpPost]
    [NoCache]
    public async Task<IActionResult> Create([FromBody] ProductDto model)
    {
      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var parentCategory = await StoreContext.Categories
                                             .FirstOrDefaultAsync(c => c.Id == model.ParentCategoryId);

      if (parentCategory == null)
        ModelState.AddModelError(nameof(model.ParentCategoryId), "Parent category not found");

      var manufacturer = await StoreContext.Manufacturers
                                           .FirstOrDefaultAsync(m => m.Id == model.ManufacturerId);


      if (manufacturer == null)
        ModelState.AddModelError(nameof(model.ManufacturerId), "Manufacturer not found");

      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var item = new Product();
      item.Name = model.Name;
      item.Description = model.Description;
      item.StockCount = model.StockCount;
      item.Price = model.Price;
      item.CurrentPrice = model.CurrentPrice;
      item.ImageUrl = model.ImageUrl;
      item.NewProduct = model.NewProduct;
      item.PromoActive = model.PromoActive;

      item.ParentCategory = parentCategory;
      item.Manufacturer = manufacturer;
      
      StoreContext.Products.Add(item);
      await StoreContext.SaveChangesAsync();

      var dto = Mapper.Map<ProductDto>(item);
      return CreatedAtRoute(nameof(GetProductById), new {controller = nameof(ProductController), id = item.Id}, dto);
    }

    [HttpPut]
    [NoCache]
    [Route("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductDto model)
    {
      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var item = await StoreContext.Products
                                   .Include(p => p.Manufacturer)
                                   .Include(p => p.ParentCategory)
                                   .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                                   .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      item.Name = model.Name;
      item.Description = model.Description;
      item.StockCount = model.StockCount;
      item.Price = model.Price;
      item.CurrentPrice = model.CurrentPrice;
      item.ImageUrl = model.ImageUrl;
      item.NewProduct = model.NewProduct;
      item.PromoActive = model.PromoActive;
      
      StoreContext.Products.Update(item);
      await StoreContext.SaveChangesAsync();

      var dto = Mapper.Map<ProductDto>(item);
      return Ok(dto);
    }

    [HttpDelete]
    [NoCache]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
      var item = await StoreContext.Products
                                   .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                                   .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      StoreContext.Products.Remove(item);
      await StoreContext.SaveChangesAsync();
      return NoContent();
    }

    [HttpPut]
    [NoCache]
    [Route("{id:int}/add-tag/{tagId:int}")]
    public async Task<IActionResult> AddTag(int id, int tagId)
    {
      var item = await StoreContext.Products
                                   .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                                   .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      var tagToAdd = await StoreContext.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
      if (tagToAdd == null)
        ModelState.AddModelError(nameof(tagId), "Invalid tag id");

      if (tagToAdd.ParentCategoryId != item.ParentCategoryId)
        ModelState.AddModelError(nameof(item.ParentCategoryId), "Tag is not available in product's parent category");

      if (item.ProductTags.Any(pt => pt.TagId == tagId))
        ModelState.AddModelError(nameof(tagId), $"Product already has tag with id '{tagId}'");

      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var productTag = new ProductTag { Product = item, Tag = tagToAdd };
      item.ProductTags.Add(productTag);
      StoreContext.ProductTag.Add(productTag);
      await StoreContext.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete]
    [NoCache]
    [Route("{id:int}/remove-tag/{tagId:int}")]
    public async Task<IActionResult> RemoveTag(int id, int tagId)
    {
      var item = await StoreContext.Products
                             .Include(p => p.ProductTags).ThenInclude(pt => pt.Tag)
                             .FirstOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      var tagToRemove = await StoreContext.Tags.FirstOrDefaultAsync(t => t.Id == tagId);
      if (tagToRemove == null)
        ModelState.AddModelError(nameof(tagId), "Invalid tag id");

      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (tagToRemove.ParentCategoryId != item.ParentCategoryId)
        ModelState.AddModelError(nameof(item.ParentCategoryId), "Tag is not available in product's parent category");

      if (item.ProductTags.All(pt => pt.TagId != tagId))
        ModelState.AddModelError(nameof(tagId), $"Product does not have tag with id '{tagId}'");

      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var productTagToDelete = await StoreContext.ProductTag
                                                 .Include(pt => pt.Product)
                                                 .Include(pt => pt.Tag)
                                                 .FirstOrDefaultAsync(pt => pt.ProductId == id && pt.TagId == tagId);

      StoreContext.ProductTag.Remove(productTagToDelete);
      await StoreContext.SaveChangesAsync();
      return Ok();
    }
  }
}