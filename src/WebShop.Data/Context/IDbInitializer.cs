namespace WebShop.Data.Context
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;

    public interface IDbInitializer
  {
    void Initialize(IHostingEnvironment env);
  }
}