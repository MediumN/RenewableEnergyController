// Controllers/SystemHealthController.cs
using RenewableEnergyController.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
    [Authorize]
    public class SystemHealthController : Controller
    {
        public ActionResult Index()
        {
            var model = new SystemHealthModel
            {
                SystemOnline = true,
                SystemTemperature = 32.4,
                SoftwareVersion = "2.3.4",
                LastMaintenanceDate = DateTime.Now.AddMonths(-2),
                PanelEfficiency = 96,
                Components = new List<ComponentStatus>
                {
                    new ComponentStatus { Name = "Solar Panels", Status = "OK", LastChecked = DateTime.Now.AddDays(-1) },
                    new ComponentStatus { Name = "Battery Bank", Status = "Warning", LastChecked = DateTime.Now.AddDays(-1) },
                    new ComponentStatus { Name = "Inverter", Status = "OK", LastChecked = DateTime.Now.AddDays(-1) },
                    new ComponentStatus { Name = "Charge Controller", Status = "OK", LastChecked = DateTime.Now.AddDays(-1) },
                    new ComponentStatus { Name = "Monitoring System", Status = "OK", LastChecked = DateTime.Now }
                }
            };

            return View(model);
        }
    }
}
