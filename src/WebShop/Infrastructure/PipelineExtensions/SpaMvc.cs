namespace WebShop.Infrastructure.PipelineExtensions
{
  using System.Globalization;
  using System.Security.Claims;
  using Attributes;
  using Authorization;
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.Hosting;
  using Microsoft.Extensions.DependencyInjection;
  using Newtonsoft.Json;

  public static partial class PipelineExtensions
  {
    public static void AddSpaMvc(this IServiceCollection services, IHostingEnvironment env)
    {
      const string requirementPolicyName = "ContentEditors";
      // allowed emails for content editors authorization requirement policy
      var emails = new[] {"admin@it.io", "content@it.io"};
      var requirement = new ContentEditorsRequirement(emails);

      services.AddMvcCore(options =>
        {
          options.Filters.Add(new ApiExceptionFilterAttribute());
        })
        .AddViews()
        .AddRazorViewEngine()
        .AddCacheTagHelper()
        .AddApiExplorer()
        .AddAuthorization(options => options.AddPolicy(requirementPolicyName,
                                      policy => policy.Requirements.Add(requirement)))
        .AddDataAnnotations()
        .AddFormatterMappings()
        .AddJsonFormatters(options =>
        {
          options.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
          options.Culture = new CultureInfo("cs-CZ");
          options.Formatting = env.IsDevelopment() ? Formatting.Indented : Formatting.None;
        });
    }

    public static void UseSpaMvc(this IApplicationBuilder app)
    {
      app.UseMvc(routes =>
      {
        routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");

        // for non-existing routes/assets:
        // /some/route/foo.bar will return 404 (if it's not an existing file)
        // /some/route/foobar will map to spa (index page)
        // https://github.com/aspnet/JavaScriptServices/blob/dev/samples/angular/MusicStore/Startup.cs#L84
        routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
      });
    }
  }
}