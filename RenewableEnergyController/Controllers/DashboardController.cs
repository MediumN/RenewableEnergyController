// Controllers/DashboardController.cs
using RenewableEnergyController.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace RenewableEnergyController.Controllers
{
	[Authorize]
	public class DashboardController : Controller
	{
		public ActionResult Index()
		{
			// Generate sample energy production data
			var energyProduction = new EnergyProductionModel
			{
				CurrentKWh = 2.5,
				DailyKWh = 15.2,
				MonthlyKWh = 450,
				ProductionData = GetSampleProductionData()
			};

			// Generate sample battery status data
			var batteryStatus = new BatteryStatusModel
			{
				ChargePercentage = 80,
				ChargeStatus = "Normal",
				EstimatedRuntimeHours = 14,
				ChargingRate = 0.75,
				EfficiencyPercentage = 92
			};

			// Generate sample alerts
			var alerts = new List<AlertModel>
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
				}
			};

			// Generate sample analytics data
			var analytics = new AnalyticsModel
			{
				DailyUsage = new List<DailyUsageData>
				{
					new DailyUsageData { Day = "Mon", KWh = 2.7 },
					new DailyUsageData { Day = "Tue", KWh = 3.1 },
					new DailyUsageData { Day = "Wed", KWh = 3.5 },
					new DailyUsageData { Day = "Thu", KWh = 2.5 },
					new DailyUsageData { Day = "Fri", KWh = 3.2 },
				},
				PeakUsage = 3.7,
				AverageUsage = 2.9
			};

			// Create a view model for the dashboard
			var viewModel = new Dictionary<string, object>
			{
				{ "EnergyProduction", energyProduction },
				{ "BatteryStatus", batteryStatus },
				{ "Alerts", alerts },
				{ "Analytics", analytics }
			};

			return View(viewModel);
		}

		private List<EnergyProductionDataPoint> GetSampleProductionData()
		{
			var data = new List<EnergyProductionDataPoint>();
			var random = new Random();
			var baseValue = 1.5;

			for (int i = 0; i < 10; i++)
			{
				data.Add(new EnergyProductionDataPoint
				{
					TimeStamp = DateTime.Now.AddHours(-9 + i),
					KWh = baseValue + random.NextDouble()
				});

				baseValue += 0.1;
			}

			return data;
		}
	}
}
