namespace WebShop.Controllers.Api
{
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

  [Route("api/products")]
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

      var categories = await StoreContext.Categories
                                     .Where(c => c.Name.Contains(term))
                                     .ToListAsync();

      var items = await StoreContext.Products
                                    .Where(p => p.Name.Contains(term) || p.Description.Contains(term))
                                    .Take(count)
                                    .ToListAsync();

      var result = new
      {
        routes = categories,
        products = items
      };

      return Ok(result);
    }

    [HttpGet]
    [Route("{productNumber}/detail")]
    [NoCache]
    public async Task<IActionResult> GetProductDetail(string productNumber)
    {
      if (string.IsNullOrWhiteSpace(productNumber))
      {
        ModelState.AddModelError(nameof(productNumber), "Invalid product number");
        return BadRequest(ModelState);
      }

      var item = await StoreContext.ProductDetails
                                   .Include(d => d.ParentProduct)
                                   .Where(d => d.ParentProduct.ProductNumber == productNumber)
                                   .FirstOrDefaultAsync();

      if (item == null)
        return NoContent();

      return Ok(Mapper.Map<ProductDetailDto>(item));
    }

    [HttpGet]
    [Route("{id:int}", Name = nameof(GetProductById))]
    [NoCache]
    public async Task<ActionResult> GetProductById(int id)
    {
      var item = await StoreContext.Products
        .Include(p => p.ParentCategory)
        .Include(p => p.Manufacturer)
        .Include(p => p.ProductTags)
        .SingleOrDefaultAsync(p => p.Id == id);

      if (item == null)
        return NotFound();

      return Ok(item);
    }
  }
}