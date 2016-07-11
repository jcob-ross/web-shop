namespace WebShop.Data.Entities
{
  using System.Collections.Generic;
  using System.ComponentModel.DataAnnotations;

  public class Tag
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string UrlSegment { get; set; }
    public bool ShowInMainMenu { get; set; }

    [Required]
    public int ParentCategoryId { get; set; }
    [Required]
    public ProductCategory ParentCategory { get; set; }

    public List<Product> Products { get; set; } = new List<Product>();
  }

  public class TagDto
  {
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string UrlSegment { get; set; }
    public bool ShowInMainMenu { get; set; }

    [Required]
    public int ParentCategoryId { get; set; }
    public ProductCategory ParentCategory { get; set; }
  }
}