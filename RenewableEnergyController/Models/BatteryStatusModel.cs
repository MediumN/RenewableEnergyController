// Models/BatteryStatusModel.cs
using System;

namespace RenewableEnergyController.Models
{
    public class BatteryStatusModel
    {
        public int ChargePercentage { get; set; }
        public string ChargeStatus { get; set; }
        public int EstimatedRuntimeHours { get; set; }
        public double ChargingRate { get; set; }
        public double EfficiencyPercentage { get; set; }
    }
}