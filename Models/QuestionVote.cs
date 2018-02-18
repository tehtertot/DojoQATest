using System.ComponentModel.DataAnnotations;

namespace DojoQA.Models
{
    public class QuestionVote : BaseEntity
    {
        [Key]
        public int QuestionVoteId { get; set; }
        
        public int QuestionId { get; set; }
        public Question Question { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}