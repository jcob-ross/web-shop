namespace WebShop.Controllers
{
  using System;
  using System.Threading.Tasks;
  using Data;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Identity;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Extensions.Logging;
  using Models.Account;

  [Authorize]
  public class AccountController : Controller
  {
    private readonly UserManager<ShopUser> _userManager;
    private readonly SignInManager<ShopUser> _signInManager;
    private readonly ILogger _logger;

    public AccountController(
      UserManager<ShopUser> userManager,
      SignInManager<ShopUser> signInManager,
      ILoggerFactory loggerFactory)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _logger = loggerFactory.CreateLogger<AccountController>();
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult Login(string returnUrl = null)
    {
      ViewData["ReturnUrl"] = returnUrl;
      return View();
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
    {
      ViewData["ReturnUrl"] = returnUrl;
      if (ModelState.IsValid)
      {
        // This doesn't count login failures towards account lockout
        // To enable password failures to trigger account lockout, set lockoutOnFailure: true
        var result = await _signInManager
          .PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);

        if (result.Succeeded)
        {
          _logger.LogInformation(1, "User logged in.");
          return RedirectToLocal(returnUrl);
        }
        if (result.IsLockedOut)
        {
          _logger.LogWarning(2, "User account locked out.");
          return View("Lockout");
        }
        else
        {
          ModelState.AddModelError(string.Empty, "Invalid login attempt.");
          return View(model);
        }
      }

      // If we got this far, something failed, redisplay form
      return View(model);
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult Register()
    {
      return View();
    }

    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
      if (ModelState.IsValid)
      {
        var user = new ShopUser { UserName = model.UserName, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
          // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
          // Send an email with this link
          //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
          //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
          //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
          //    "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
          await _signInManager.SignInAsync(user, isPersistent: false);
          _logger.LogInformation(3, "User created a new account with password.");
          return RedirectToAction(nameof(HomeController.Index), "Home");
        }
        AddErrors(result);
      }

      // If we got this far, something failed, redisplay form
      return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> LogOff()
    {
      await _signInManager.SignOutAsync();
      Console.WriteLine("logged off");
      _logger.LogInformation(4, "User logged out.");
      return RedirectToAction(nameof(HomeController.Index), "Home");
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> ConfirmEmail(string userId, string code)
    {
      if (userId == null || code == null)
      {
        return View("Error");
      }
      var user = await _userManager.FindByIdAsync(userId);
      if (user == null)
      {
        return View("Error");
      }
      var result = await _userManager.ConfirmEmailAsync(user, code);
      return View(result.Succeeded ? "ConfirmEmail" : "Error");
    }

    #region Helpers

    private void AddErrors(IdentityResult result)
    {
      foreach (var error in result.Errors)
      {
        ModelState.AddModelError(string.Empty, error.Description);
      }
    }

    private async Task<ShopUser> GetCurrentUserAsync()
    {
      var uid = _userManager.GetUserId(User);
      return await _userManager.FindByIdAsync(uid);
    }

    private IActionResult RedirectToLocal(string returnUrl)
    {
      if (Url.IsLocalUrl(returnUrl))
      {
        return Redirect(returnUrl);
      }
      else
      {
        return RedirectToAction(nameof(HomeController.Index), "Home");
      }
    }

    #endregion
  }
}