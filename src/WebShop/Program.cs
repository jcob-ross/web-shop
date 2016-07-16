namespace WebShop
{
  using System.Collections.Generic;
  using System.IO;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.Extensions.Configuration;

  public class Program
  {
    public static void Main(string[] args)
    {
      var configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables("ASPNETCORE_")
                .AddCommandLine(args)
                .Build();

      IWebHost host = new WebHostBuilder()
        .UseConfiguration(configuration)
        .UseKestrel()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseIISIntegration()
        .UseStartup<Startup>()
        .Build();

      host.Run();
    }
  }
}