using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DojoQA.Models
{
    public class Tag : BaseEntity
    {
        [Key]
        public int TagId { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }

        public List<QuestionTag> Questions { get; set; }

        public Tag() {
            Questions = new List<QuestionTag>();
        }
    }
}