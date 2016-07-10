namespace WebShop.Infrastructure.DeploymentEnvironment
{
  /// <summary>
  ///   Represents metadata about deployment environment
  /// </summary>
  public interface IDeploymentEnvironment
  {
    void Initialize();
    string DeploymentSha { get; }
    string Environment { get; }
    string Application { get; }
    string Framework { get; }
    string OS { get; }
  }
}