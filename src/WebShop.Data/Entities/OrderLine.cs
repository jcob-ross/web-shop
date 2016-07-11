namespace WebShop.Data.Entities
{
  using System.ComponentModel.DataAnnotations;

  public class OrderLine
  {
    [Key]
    public int Id { get; set; }
    public int Quantity { get; set; }
    [Required]
    public Product Product { get; set; }
  }

  public class OrderLineDto
  {
    public int Id { get; set; }
    [Required]
    public int Quantity { get; set; }
    [Required]
    public ProductDto Product { get; set; }
  }
}