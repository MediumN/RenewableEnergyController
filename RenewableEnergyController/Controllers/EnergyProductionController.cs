// Controllers/EnergyProductionController.cs
using RenewableEnergyController.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
    [Authorize]
    public class EnergyProductionController : Controller
    {
        public ActionResult Index()
        {
            var model = new EnergyProductionModel
            {
                CurrentKWh = 2.5,
                DailyKWh = 15.2,
                MonthlyKWh = 450,
                ProductionData = GetProductionData()
            };

            return View(model);
        }

        private List<EnergyProductionDataPoint> GetProductionData()
        {
            var data = new List<EnergyProductionDataPoint>();
            var random = new Random();
            var baseValue = 1.5;

            for (int i = 0; i < 30; i++)
            {
                data.Add(new EnergyProductionDataPoint
                {
                    TimeStamp = DateTime.Now.AddHours(-29 + i),
                    KWh = baseValue + random.NextDouble()
                });

                baseValue += 0.1;
            }

            return data;
        }
    }
}