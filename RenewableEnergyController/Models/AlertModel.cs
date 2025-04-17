// Models/AlertModel.cs
using System;

namespace RenewableEnergyController.Models
{
    public class AlertModel
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public AlertType Type { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsRead { get; set; }
    }

    public enum AlertType
    {
        Warning,
        Info,
        Success,
        Danger
    }
}