// Controllers/BatteryStatusController.cs
using RenewableEnergyController.Models;
using System;
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
    [Authorize]
    public class BatteryStatusController : Controller
    {
        public ActionResult Index()
        {
            var model = new BatteryStatusModel
            {
                ChargePercentage = 80,
                ChargeStatus = "Normal",
                EstimatedRuntimeHours = 14,
                ChargingRate = 0.75,
                EfficiencyPercentage = 92
            };

            return View(model);
        }
    }
}
}