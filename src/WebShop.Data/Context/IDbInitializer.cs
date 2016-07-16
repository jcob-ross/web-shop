namespace WebShop.Data.Context
{
  using System.Threading.Tasks;

  public interface IDbInitializer
  {
    void Initialize();
  }
}