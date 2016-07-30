﻿namespace WebShop
{
    using System;
    using Data;
    using Data.Context;
    using Data.Repositiories;
    using Infrastructure;
    using Infrastructure.Authentication;
    using Infrastructure.Authorization;
    using Infrastructure.DeploymentEnvironment;
    using Infrastructure.MarkdownSanitizer;
    using Infrastructure.PipelineExtensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;

    public class Startup
  {
    private IHostingEnvironment _env;
    public IConfigurationRoot Configuration { get; }

    public Startup(IHostingEnvironment env)
    {
      IConfigurationBuilder builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        .AddEnvironmentVariables();

      _env = env;

      Configuration = builder.Build();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddOptions();
      services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
      services.AddMemoryCache();

      // infrastructure / pipeline extensions / spa mvc
      services.AddSpaMvc(_env);

      string dbConnectionString;
      if (_env.IsDevelopment())
        dbConnectionString = Configuration.GetConnectionString("PosgreSqlConnection");
      else
        dbConnectionString = Configuration["PostgreSqlConnection"]; // ENV valiable

      if (String.IsNullOrWhiteSpace(dbConnectionString))
        throw new Exception("Connection string cannot be empty");

      services.AddDbContext<PosgresDbContext>(options =>
        {
          options.UseNpgsql(dbConnectionString);
        });

      services.AddIdentity<ShopUser, IdentityRole>(options =>
        {
          options.Password.RequireDigit = false;
          options.Password.RequireLowercase = false;
          options.Password.RequireUppercase = false;
          options.Password.RequireNonAlphanumeric = false;
          options.Password.RequiredLength = 4;

          options.Cookies.ApplicationCookie.AutomaticAuthenticate = true;
          options.Cookies.ApplicationCookie.AutomaticChallenge = true;
          // todo(auth): forbidden redirect handling
          options.Cookies.ApplicationCookie.AccessDeniedPath = new Microsoft.AspNetCore.Http.PathString("/Forbidden");
          options.Cookies.ApplicationCookie.Events = ShopCookieAuthentication.CreateCookieEvents();
        })
        .AddEntityFrameworkStores<PosgresDbContext>()
        .AddDefaultTokenProviders();


      services.AddSingleton<IAuthorizationHandler, ContentEditorsHandler>();
      services.AddSingleton<IDeploymentEnvironment, DeploymentEnvironment>();
      services.AddSingleton<IMarkdownSanitizer, MarkdownSanitizer>();
      services.AddTransient<IDbInitializer, PosgresDbInitializer>();
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddAutoMapper();
      services.AddSwaggerGen();
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      var logger = loggerFactory.CreateLogger("Startup");
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      
      var deploymentEnv = app.ApplicationServices.GetService<IDeploymentEnvironment>();
      deploymentEnv.Initialize();

      if (env.IsDevelopment())
      {
        loggerFactory.AddDebug();
        app.UseDeveloperExceptionPage();
        if (Configuration.GetValue<bool>("SeedDb"))
        {
          using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                                      .CreateScope())
          {
            serviceScope.ServiceProvider.GetService<IDbInitializer>().Initialize(env);
          }
        }
      }
      else
      {
        if (Configuration.GetValue<bool>("DO_SEED_DB")) // ENV variable
        {
          logger.LogInformation("About to seed db");
          using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>()
                                      .CreateScope())
          {
            serviceScope.ServiceProvider.GetService<IDbInitializer>().Initialize(env);
          }
        }
        app.UseExceptionHandler("/Home/Error");
      }
      

      app.UseSwagger();
      app.UseSwaggerUi();

      // infrastructure / pipeline extensions / gzip static files
      app.UseStaticFilesWithGzip();
      app.UseIdentity();
      // infrastructure / pipeline extensions / spa mvc
      app.UseSpaMvc();
    }
  }
}