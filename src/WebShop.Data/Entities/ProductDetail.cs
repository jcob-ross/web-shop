namespace WebShop.Data.Entities
{
  using System.ComponentModel.DataAnnotations;

  public class ProductDetail
  {
    public int Id { get; set; }

    public string Markup { get; set; }
    public int ParentProductId { get; set; }
    public Product ParentProduct { get; set; }
  }

  public class ProductDetailDto
  {
    public int Id { get; set; }
    [StringLength(30000, ErrorMessage = "Maximum length of {0} is {1} characters")]
    public string Markup { get; set; }
    public int ParentProductId { get; set; }
  }
}