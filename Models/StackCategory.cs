using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DojoQA.Models
{
    public class StackCategory : BaseEntity
    {
        [Key]
        public int StackCategoryId { get; set; }
        public string Name { get; set; }
        public int SortOrder { get; set; }

        public List<Tag> AssociatedTags { get; set; }

        public StackCategory() {
            AssociatedTags = new List<Tag>();
        }
    }
}