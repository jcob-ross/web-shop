namespace WebShop.Data.Context
{
  using System.Threading.Tasks;

  public interface IShopDbInitializer
  {
    Task InitializeAsync();
  }
}