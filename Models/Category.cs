using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DojoQA.Models
{
    public class Category : BaseEntity
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public List<Tag> AssociatedTags { get; set; }

        public Category() {
            AssociatedTags = new List<Tag>();
        }
    }
}