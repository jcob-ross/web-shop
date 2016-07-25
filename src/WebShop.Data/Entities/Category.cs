namespace WebShop.Data.Entities
{
  using System;
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public sealed class Category
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string UrlSegment { get; set; }
    public string ImageUrl { get; set; }
    public int ViewDisplayOrder { get; set; }

    public List<Product> Products { get; set; } = new List<Product>();
    public List<Manufacturer> Manufacturers { get; set; } = new List<Manufacturer>();
    public List<Tag> Tags { get; set; } = new List<Tag>();
  }

  public sealed class CategoryDto
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string UrlSegment { get; set; }
    [Required]
    public string ImageUrl { get; set; }
    [Required]
    public int ViewDisplayOrder { get; set; }

    public List<ManufacturerDto> Manufacturers { get; set; } = new List<ManufacturerDto>();
    public List<TagDto> Tags { get; set; } = new List<TagDto>();
  }
}