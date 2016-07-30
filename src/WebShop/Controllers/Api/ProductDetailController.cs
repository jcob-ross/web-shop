namespace WebShop.Controllers.Api
{
  using System.Threading.Tasks;
  using AutoMapper;
  using Data.Context;
  using Data.Entities;
  using Infrastructure.Attributes;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Caching.Memory;
  using System.Linq;
  using Infrastructure.MarkdownSanitizer;
  using System;
  using Microsoft.Extensions.Logging;
  using Microsoft.AspNetCore.Authorization;

  [Route("api/product")]
  [Produces("application/json")]
  [Authorize("ContentEditors")]
  public class ProductDetailController : Controller
  {
    private ILogger _logger;
    public PosgresDbContext StoreContext { get; }
    public IMapper Mapper { get; }
    public IMemoryCache Cache { get; }
    public IMarkdownSanitizer MarkdownSanitizer { get; }

    public ProductDetailController(PosgresDbContext storeContext, 
      IMapper mapper, 
      IMemoryCache cache,
      IMarkdownSanitizer sanitizer,
      ILogger<ProductDetailController> logger)
    {
      StoreContext = storeContext;
      Mapper = mapper;
      Cache = cache;
      MarkdownSanitizer = sanitizer;
      _logger = logger;
    }

    [HttpPost]
    [Route("~/api/product-detail/preview-markdown")]
    public IActionResult PreviewMarkdown([FromBody] ProductDetailDto model)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var sanitizedHtml = String.Empty;
      try
      {
        var settings = CommonMark.CommonMarkSettings.Default;
        settings.OutputFormat = CommonMark.OutputFormat.Html;
        settings.AdditionalFeatures = CommonMark.CommonMarkAdditionalFeatures.StrikethroughTilde;

        var html = CommonMark.CommonMarkConverter.Convert(model.Markdown, settings);
        sanitizedHtml = MarkdownSanitizer.SanitizeHtml(html);
        _logger.LogDebug($"Sanitized html: [{sanitizedHtml}]");
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.Message);
        sanitizedHtml = "Failed to convert markdown";
      }
      model.Markdown = sanitizedHtml;
      return Ok(model);
    }

    [HttpGet]
    [Route("~/api/product-detail/{id:int}", Name = nameof(GetDetailById))]
    [NoCache]
    public async Task<IActionResult> GetDetailById(int id)
    {
      var item = await StoreContext.ProductDetails.FirstOrDefaultAsync(d => d.Id == id);
      var dto = Mapper.Map<ProductDetailDto>(item);
      return Ok(dto);
    }

    [HttpGet]
    [Route("{id:int}/detail")]
    [NoCache]
    public async Task<IActionResult> GetProductDetail(int id)
    {
      var item = await StoreContext.ProductDetails
                                   .FirstOrDefaultAsync(p => p.ParentProductId == id);

      if (item == null)
        return NotFound();

      var dto = Mapper.Map<ProductDetailDto>(item);
      return Ok(dto);
    }

    [HttpPost]
    [Route("{id:int}/detail")]
    public async Task<IActionResult> Create(int id, [FromBody] ProductDetailDto model)
    {

      if (! ModelState.IsValid)
        return BadRequest(ModelState);

      var product = await StoreContext.Products
                                      .Include(p => p.ProductDetail)
                                      .FirstOrDefaultAsync(p => p.Id == id);

      if (product == null)
        return NotFound();

      if (product.ProductDetail != null)
      {
        ModelState.AddModelError(nameof(id), "Product already has a detail associated");
        return BadRequest(ModelState);
      }

      var item = new ProductDetail
                 {
                   Markdown = model.Markdown,
                   ParentProduct = product
                 };

      StoreContext.ProductDetails.Add(item);
      await StoreContext.SaveChangesAsync();

      return CreatedAtRoute(nameof(GetDetailById), new {controller = nameof(ProductDetailController), id = item.Id},
                            Mapper.Map<ProductDetailDto>(item));
    }

    [HttpPut]
    [Route("{id:int}/detail")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductDetailDto model)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var product = await StoreContext.Products
                                      .Include(p => p.ProductDetail)
                                      .FirstOrDefaultAsync(p => p.Id == id);

      if (product == null)
        return NotFound();

      if (product.ProductDetail == null)
      {
        ModelState.AddModelError(nameof(id), "Product has no detail associated");
        return BadRequest(ModelState);
      }
      
      var item = product.ProductDetail;
      item.Markdown = model.Markdown;

      StoreContext.ProductDetails.Update(item);
      await StoreContext.SaveChangesAsync();

      return Ok(Mapper.Map<ProductDetailDto>(item));
    }

    [HttpDelete]
    [Route("{id:int}/detail")]
    public async Task<IActionResult> Delete(int id)
    {
      var product = await StoreContext.Products
                                      .Include(p => p.ProductDetail)
                                      .FirstOrDefaultAsync(p => p.Id == id);

      if (product == null)
        return NotFound();

      if (product.ProductDetail == null)
      {
        ModelState.AddModelError(nameof(id), "Product has no detail associated");
        return BadRequest(ModelState);
      }

      StoreContext.ProductDetails.Remove(product.ProductDetail);
      await StoreContext.SaveChangesAsync();
      return NoContent();
    }
  }
}