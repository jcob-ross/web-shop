namespace WebShop.Data.Entities
{
  using System;
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public class CategoryMetadataDto
  {
    
  }

  public class ProductCategory
  {
    [Key]
    public string Key { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string UrlSegment { get; set; }
    public string ImageUrl { get; set; }
    [Required]
    public int ViewDisplayOrder { get; set; }

    public List<Product> Products { get; set; } = new List<Product>();
    public List<Manufacturer> Manufacturers { get; set; } = new List<Manufacturer>();
    public List<Tag> Tags { get; set; } = new List<Tag>();
  }

  public class ProductCategoryDto
  {
    [Key]
    public string Key { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string UrlSegment { get; set; }
    public string ImageUrl { get; set; }
    [Required]
    public int ViewDisplayOrder { get; set; }

    public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    public List<ManufacturerDto> Manufacturers { get; set; } = new List<ManufacturerDto>();
    public List<TagDto> Tags { get; set; } = new List<TagDto>();
  }
}