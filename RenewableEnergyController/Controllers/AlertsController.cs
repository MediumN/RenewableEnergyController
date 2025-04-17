// Controllers/AlertsController.cs
using RenewableEnergyController.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
    [Authorize]
    public class AlertsController : Controller
    {
        public ActionResult Index()
        {
            var model = new List<AlertModel>
            {
                new AlertModel {
                    Id = 1,
                    Message = "Battery Efficiency at 92% - Consider inspection",
                    Type = AlertType.Warning,
                    Timestamp = DateTime.Now.AddHours(-2),
                    IsRead = false
                },
                new AlertModel {
                    Id = 2,
                    Message = "Panel 3 production slightly below average",
                    Type = AlertType.Info,
                    Timestamp = DateTime.Now.AddHours(-4),
                    IsRead = false
                },
                new AlertModel {
                    Id = 3,
                    Message = "System update available - Version 2.3.4",
                    Type = AlertType.Success,
                    Timestamp = DateTime.Now.AddHours(-12),
                    IsRead = false
                },
                new AlertModel {
                    Id = 4,
                    Message = "Battery maintenance recommended",
                    Type = AlertType.Warning,
                    Timestamp = DateTime.Now.AddDays(-1),
                    IsRead = true
                },
                new AlertModel {
                    Id = 5,
                    Message = "Energy production exceeded daily target",
                    Type = AlertType.Success,
                    Timestamp = DateTime.Now.AddDays(-2),
                    IsRead = true
                }
            };

            return View(model);
        }
    }
}