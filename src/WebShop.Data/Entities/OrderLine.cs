namespace WebShop.Data.Entities
{
  using System.ComponentModel.DataAnnotations;

  public class OrderLine
  {
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int ProductId { get; set; }
  }

  public class OrderLineDto
  {
    public int Id { get; set; }
    [Required]
    public int Quantity { get; set; }
    [Required]
    public int ProductId { get; set; }
  }
}