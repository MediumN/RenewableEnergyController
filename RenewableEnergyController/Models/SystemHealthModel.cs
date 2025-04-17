// Models/SystemHealthModel.cs
using System;
using System.Collections.Generic;

namespace RenewableEnergyController.Models
{
    public class SystemHealthModel
    {
        public bool SystemOnline { get; set; }
        public double SystemTemperature { get; set; }
        public string SoftwareVersion { get; set; }
        public DateTime LastMaintenanceDate { get; set; }
        public int PanelEfficiency { get; set; }
        public List<ComponentStatus> Components { get; set; }
    }

    public class ComponentStatus
    {
        public string Name { get; set; }
        public string Status { get; set; } // "OK", "Warning", "Error"
        public DateTime LastChecked { get; set; }
    }
}