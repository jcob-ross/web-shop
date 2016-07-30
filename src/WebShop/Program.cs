namespace WebShop
{
  using System.IO;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.Extensions.Configuration;

  public class Program
  {
    public static void Main(string[] args)
    {
      var configuration = new ConfigurationBuilder()
                .AddCommandLine(args)
                .Build();

      IWebHost host = new WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseConfiguration(configuration)
        .UseStartup<Startup>()
        .Build();

      host.Run();
    }
  }
}