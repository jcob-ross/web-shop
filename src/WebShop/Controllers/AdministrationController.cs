namespace WebShop.Controllers
{
  using Microsoft.AspNetCore.Mvc;

  public class AdministrationController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }

    public IActionResult Error()
    {
      return View();
    }
  }
}