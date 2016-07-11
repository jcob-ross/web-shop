namespace WebShop.Infrastructure.PipelineExtensions
{
  using Microsoft.AspNetCore.Builder;
  using Microsoft.AspNetCore.StaticFiles;

  public static partial class PipelineExtensions
  {
    public static void UseStaticFilesWithGzip(this IApplicationBuilder app)
    {
      var options = new StaticFileOptions { OnPrepareResponse = OnPrepareResponse };
      app.UseStaticFiles(options);
    }

    private static void OnPrepareResponse(StaticFileResponseContext context)
    {
      var file = context.File;
      var response = context.Context.Response;

      if (response.ContentType == "application/x-gzip")
      {
        if (file.Name.EndsWith("js.gz"))
        {
          response.ContentType = "application/javascript";
        }
        else if (context.File.Name.EndsWith("css.gz"))
        {
          response.ContentType = "text/css";
        }
        response.Headers.Add("Content-Encoding", "gzip");
      }
    }
  }
}