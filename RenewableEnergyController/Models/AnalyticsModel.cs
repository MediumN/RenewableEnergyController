// Models/AnalyticsModel.cs
using System;
using System.Collections.Generic;

namespace RenewableEnergyController.Models
{
    public class AnalyticsModel
    {
        public List<DailyUsageData> DailyUsage { get; set; }
        public double PeakUsage { get; set; }
        public double AverageUsage { get; set; }
    }

    public class DailyUsageData
    {
        public string Day { get; set; }
        public double KWh { get; set; }
    }
}