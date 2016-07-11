namespace WebShop
{
  using System.Globalization;
  using System.Security.Claims;
  using Data;
  using Data.Context;
  using Infrastructure;
  using Infrastructure.Attributes;
  using Infrastructure.DeploymentEnvironment;
  using Infrastructure.PipelineExtensions;
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
  using Microsoft.Data.Sqlite;
  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  using Microsoft.Extensions.Logging;
  using Newtonsoft.Json;
  
  public class Startup
  {
    private IHostingEnvironment _env;
    private SqliteConnection _inMemorySqliteConnection;

    public Startup(IHostingEnvironment env)
    {
      IConfigurationBuilder builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)                
        .AddUserSecrets();

      _env = env;

      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddOptions();
      services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
      services.AddMemoryCache();

      // infrastructure / pipeline extensions / spa mvc
      services.AddSpaMvc(_env);

      services.AddDbContext<PosgresDbContext>(options =>
        {
          if (_env.IsDevelopment())
          {
            //_inMemorySqliteConnection = new SqliteConnection("Data Source=:memory:");
            //_inMemorySqliteConnection.Open();
            //options.UseSqlite(_inMemorySqliteConnection);
            options.UseNpgsql(Configuration.GetConnectionString("PosgreSqlConnection"));
          }
          else
          {
            
          }
        });

      services.AddIdentity<ShopUser, IdentityRole>(options =>
        {
          options.Password.RequireDigit = false;
          options.Password.RequireLowercase = false;
          options.Password.RequireUppercase = false;
          options.Password.RequireNonAlphanumeric = false;
          options.Password.RequiredLength = 4;
        })
        .AddEntityFrameworkStores<PosgresDbContext>()
        .AddDefaultTokenProviders();

      services.AddSingleton<IDeploymentEnvironment, DeploymentEnvironment>();
      services.AddTransient<IShopDbInitializer, ShopDbInitializer>();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      var deploymentEnv = app.ApplicationServices.GetService<IDeploymentEnvironment>();
      deploymentEnv.Initialize();


      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }

      // infrastructure / pipeline extensions / gzip static files
      app.UseStaticFilesWithGzip();
      app.UseIdentity();
      // infrastructure / pipeline extensions / spa mvc
      app.UseSpaMvc();
    }
  }
}