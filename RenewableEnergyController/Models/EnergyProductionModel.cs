// Models/EnergyProductionModel.cs
using System;

namespace RenewableEnergyController.Models
{
    public class EnergyProductionModel
    {
        public double CurrentKWh { get; set; }
        public double DailyKWh { get; set; }
        public double MonthlyKWh { get; set; }
        public List<EnergyProductionDataPoint> ProductionData { get; set; }
    }

    public class EnergyProductionDataPoint
    {
        public DateTime TimeStamp { get; set; }
        public double KWh { get; set; }
    }
}