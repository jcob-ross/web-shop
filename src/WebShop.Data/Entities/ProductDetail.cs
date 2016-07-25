namespace WebShop.Data.Entities
{
  using System.ComponentModel.DataAnnotations;

  public sealed class ProductDetail
  {
    public int Id { get; set; }

    public string Markdown { get; set; }
    public int ParentProductId { get; set; }
    public Product ParentProduct { get; set; }
  }

  public sealed class ProductDetailDto
  {
    public int Id { get; set; }
    [StringLength(30000, ErrorMessage = "Maximum length of {0} is {1} characters")]
    public string Markdown { get; set; }
    public int ParentProductId { get; set; }
  }
}