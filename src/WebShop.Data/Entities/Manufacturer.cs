namespace WebShop.Data.Entities
{
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public sealed class Manufacturer
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string UrlSegment { get; set; }
    public bool ShowInMainMenu { get; set; }

    public int ParentCategoryId { get; set; }
    public Category ParentCategory { get; set; }

    public List<Product> Products { get; set; } = new List<Product>();
  }

  public sealed class ManufacturerDto
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string UrlSegment { get; set; }
    [Required]
    public bool ShowInMainMenu { get; set; }
    [Required]
    public int ParentCategoryId { get; set; }

    public int ProductCount { get; set; }
  }
}