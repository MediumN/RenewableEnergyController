// Controllers/SettingsController.cs
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
    [Authorize]
    public class SettingsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}