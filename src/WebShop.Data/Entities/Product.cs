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
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public int StockCount { get; set; }
    public decimal Price { get; set; }
    public decimal CurrentPrice { get; set; }
    public string ProductNumber { get; set; }
    public string ImageUrl { get; set; }
    public bool NewProduct { get; set; }
    public bool PromoActive { get; set; }

    public ProductDetail ProductDetail { get; set; }

    public Manufacturer Manufacturer { get; set; }

    public int ParentCategoryId { get; set; }
    public Category ParentCategory { get; set; }

    public List<ProductTag> ProductTags { get; set; } = new List<ProductTag>();
  }

  public class ProductDto
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int ManufacturerId { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int StockCount { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Required]
    public decimal CurrentPrice { get; set; }
    public string ProductNumber { get; set; }
    [Required]
    public string ImageUrl { get; set; }
    [Required]
    public bool NewProduct { get; set; }
    [Required]
    public bool PromoActive { get; set; }
    [Required]
    public int ParentCategoryId { get; set; }
    public List<TagDto> Tags { get; set; } = new List<TagDto>();
  }
}