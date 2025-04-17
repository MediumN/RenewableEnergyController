// Controllers/AnalyticsController.cs
using RenewableEnergyController.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
    [Authorize]
    public class AnalyticsController : Controller
    {
        public ActionResult Index()
        {
            var model = new AnalyticsModel
            {
                DailyUsage = new List<DailyUsageData>
                {
                    new DailyUsageData { Day = "Mon", KWh = 2.7 },
                    new DailyUsageData { Day = "Tue", KWh = 3.1 },
                    new DailyUsageData { Day = "Wed", KWh = 3.5 },
                    new DailyUsageData { Day = "Thu", KWh = 2.5 },
                    new DailyUsageData { Day = "Fri", KWh = 3.2 },
                    new DailyUsageData { Day = "Sat", KWh = 2.8 },
                    new DailyUsageData { Day = "Sun", KWh = 2.3 }
                },
                PeakUsage = 3.7,
                AverageUsage = 2.9
            };

            return View(model);
        }
    }
}