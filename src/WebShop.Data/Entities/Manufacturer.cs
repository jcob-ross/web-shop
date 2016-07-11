namespace WebShop.Data.Entities
{
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public class Manufacturer
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string UrlSegment { get; set; }
    public bool ShowInMainMenu { get; set; }

    [Required]
    public int ParentCategoryId { get; set; }
    [Required]
    public ProductCategory ParentCategory { get; set; }

    public List<Product> Products { get; set; } = new List<Product>();
  }

  public class ManufacturerDto
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string UrlSegment { get; set; }
    public bool ShowInMainMenu { get; set; }

    [Required]
    public int ParentCategoryId { get; set; }
    [Required]
    public ProductCategoryDto ParentCategory { get; set; }

    public List<ProductDto> Products { get; set; } = new List<ProductDto>();
  }
}