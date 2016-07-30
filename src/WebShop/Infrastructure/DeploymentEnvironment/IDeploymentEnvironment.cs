using Microsoft.Extensions.Configuration;

namespace WebShop.Infrastructure.DeploymentEnvironment
{
  /// <summary>
  ///   Represents metadata about deployment environment
  /// </summary>
  public interface IDeploymentEnvironment
  {
    void Initialize(IConfigurationRoot config);
    string DeploymentSha { get; }
    string Environment { get; }
    string Application { get; }
    string Framework { get; }
    string OS { get; }
  }
}