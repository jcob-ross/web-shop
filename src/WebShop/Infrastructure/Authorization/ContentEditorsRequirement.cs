namespace WebShop.Infrastructure.Authorization
{
  using System.Collections.Generic;
  using System.Linq;
  using System.Security.Claims;
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.Extensions.Logging;

  public class ContentEditorsRequirement : IAuthorizationRequirement
  {
    protected List<string> AllowedEmails { get; set; }

    public ContentEditorsRequirement(IEnumerable<string> allowedEmails)
    {
      AllowedEmails = new List<string>(allowedEmails);
    }

    public bool IsEmailAllowed(string email)
    {
      return AllowedEmails.Contains(email);
    }
  }

  public class ContentEditorsHandler : AuthorizationHandler<ContentEditorsRequirement>
  {
    private readonly ILogger<ContentEditorsHandler> _logger;

    public ContentEditorsHandler(ILogger<ContentEditorsHandler> logger)
    {
      _logger = logger;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ContentEditorsRequirement requirement)
    { 
      ClaimsPrincipal user = context.User;
      var email = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
      
      if (requirement.IsEmailAllowed(email))
      {
        _logger.LogInformation($"Authorization was successful for email: {email}");
        context.Succeed(requirement);
      }

      return Task.FromResult(0);
    }
  }
}