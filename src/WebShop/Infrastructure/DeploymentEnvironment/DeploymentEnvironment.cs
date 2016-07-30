namespace WebShop.Infrastructure.DeploymentEnvironment
{
    using System;
    using System.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.PlatformAbstractions;

    /// <summary>
    ///   Represents metadata about deployment environment
    /// </summary>
    public class DeploymentEnvironment : IDeploymentEnvironment
  {
    private readonly IHostingEnvironment _hostingEnv;
    private readonly ILogger<DeploymentEnvironment> _logger;

    public DeploymentEnvironment(IHostingEnvironment hostingEnv, ILogger<DeploymentEnvironment> logger)
    {
      _hostingEnv = hostingEnv;
      _logger = logger;
    }

    public string DeploymentSha { get; private set; } = String.Empty;
    public string Environment { get; private set; } = String.Empty;
    public string Application { get; private set; } = String.Empty;
    public string Framework { get; private set; } = String.Empty;
    public string OS { get; private set; } = String.Empty;

    public void Initialize(IConfigurationRoot config)
    {
      Environment = _hostingEnv.EnvironmentName;

      var appName = PlatformServices.Default.Application.ApplicationName;
      var appVersion = PlatformServices.Default.Application.ApplicationVersion;
      Application = $"{appName} - {appVersion}";

      var framework = PlatformServices.Default.Application.RuntimeFramework;
      var frameworkDesc = System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription;
      var frameworkVersion = PlatformServices.Default.Application.RuntimeFramework.Version;
      Framework = $"{framework} - {frameworkVersion} ({frameworkDesc})";

      var osDesc = System.Runtime.InteropServices.RuntimeInformation.OSDescription;
      var osArch = System.Runtime.InteropServices.RuntimeInformation.OSArchitecture;
      OS = $"{osDesc} {osArch}";

      string envCommitSha = config["HEAD_HASH"]; // env variable on heroku via post-commit hook
      if (!String.IsNullOrWhiteSpace(envCommitSha) && envCommitSha.Length > 0)
      {
        _logger.LogInformation($"Commit sha loaded from enviromental variable ({envCommitSha})");
        DeploymentSha = envCommitSha;
      }
      else
      {
        // todo(cleanup): pure, no side effects
        LoadCommitSha();
      }
    }

    private void LoadCommitSha()
    {
      _logger.LogInformation("Trying to get commit sha from git.");

      try
      {
        var git = Process.Start(new ProcessStartInfo
        {
          FileName = "git",
          Arguments = "rev-parse HEAD",
          UseShellExecute = false,
          RedirectStandardOutput = true,
          CreateNoWindow = true
        });

        var gitOut = String.Empty;
        while (!git.StandardOutput.EndOfStream)
        {
          gitOut += git.StandardOutput.ReadLine();
        }

        git.WaitForExit();
        if (git.ExitCode != 0)
        {
          _logger.LogWarning("Could not determine commit sha; Git exitted with code {exitCode}", git.ExitCode);
          DeploymentSha = "Could not determine commit sha, subprocess exitted abnormally.";
        }
        else
        {
          _logger.LogInformation("Current commit sha is {gitOut}", gitOut);
          DeploymentSha = gitOut;
        }
      }
      catch (Exception ex)
      {
        _logger.LogError(0, ex, "Error while retrieving commit sha");
        DeploymentSha = "Error while retrieving commit sha";
      }
    }
  }
}