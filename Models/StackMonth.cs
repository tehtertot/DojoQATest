using System;
using System.ComponentModel.DataAnnotations;

namespace DojoQA.Models
{
    public class StackMonth : BaseEntity
    {
        [Key]
        public int StackMonthId { get; set; }
        
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string MonthReference { get; set; }
    }
}