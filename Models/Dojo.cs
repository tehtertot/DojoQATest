using System.Collections.Generic;

namespace DojoQA.Models
{
    public class Dojo : BaseEntity
    {
        public int DojoId { get; set; }
        
        public string Location { get; set; }

        public List<ApplicationUser> DojoStudents { get; set; }
    }
}