namespace WebShop.Data.Entities
{

  /// <summary>
  ///   Intermediate entity representing Product - Tag may-to-many mapping
  /// </summary>
  public class ProductTag
  {
    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int TagId { get; set; }
    public Tag Tag { get; set; }
  }
}