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

      services.AddMvcCore(options =>
        {
          options.Filters.Add(new ApiExceptionFilterAttribute());
        })
        .AddViews()
        .AddRazorViewEngine()
        .AddCacheTagHelper()
        .AddApiExplorer()
        .AddAuthorization(options => options.AddPolicy("OwnerOnly",
                                      policy => policy.RequireClaim(ClaimTypes.Email, "admin@it.io")))
        .AddDataAnnotations()
        .AddFormatterMappings()
        .AddJsonFormatters(options =>
          {
            options.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            options.Culture = new CultureInfo("cs-CZ");
            options.Formatting = _env.IsDevelopment() ? Formatting.Indented : Formatting.None;
          });

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

      app.UseStaticFilesWithGzip();

      app.UseIdentity();

      app.UseMvc(routes =>
      {
        routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");

        // for non-existing routes/assets:
        // /some/route/foo.bar will return 404
        // /some/route/foobar will map to spa (index page)
        // https://github.com/aspnet/JavaScriptServices/blob/dev/samples/angular/MusicStore/Startup.cs#L84
        routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
      });
    }
  }
}