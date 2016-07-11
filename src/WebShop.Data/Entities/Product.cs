namespace WebShop.Data.Entities
{
  using System;
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public class PagedSearchModel
  {
    
  }

  public class PagedSearchResult
  {
    
  }

  public class Product
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public Manufacturer Manufacturer { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int StockCount { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public decimal CurrentPrice { get; set; }
    public string ProductNumber { get; set; }
    public string ImageUrl { get; set; }

    [Required]
    public int ParentCategoryId { get; set; }
    [Required]
    public ProductCategory ParentCategory { get; set; }

    public List<Tag> Tags { get; set; } = new List<Tag>();
  }

  public class ProductDto
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public ManufacturerDto Manufacturer { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int StockCount { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public decimal CurrentPrice { get; set; }
    public string ProductNumber { get; set; }
    public string ImageUrl { get; set; }

    [Required]
    public int ParentCategoryId { get; set; }
    [Required]
    public ProductCategoryDto ParentCategory { get; set; }

    public List<TagDto> Tags { get; set; } = new List<TagDto>();
  }
}