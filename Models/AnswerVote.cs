using System.ComponentModel.DataAnnotations;

namespace DojoQA.Models
{
    public class AnswerVote : BaseEntity
    {
        [Key]
        public int AnswerVoteId { get; set; }
        
        public int AnswerId { get; set; }
        public Answer Answer { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}