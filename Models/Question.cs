using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DojoQA.Models
{
    public class Question : BaseEntity
    {
        [Key]
        public int QuestionId { get; set; }

        public string QuestionTitle { get; set; }

        [MinLength(10, ErrorMessage="Please provide a more descriptive question.")]
        public string QuestionText { get; set; }

        public ApplicationUser AskedBy { get; set; }

        public List<Answer> Answers { get; set; }

        public List<QuestionTag> Tags { get; set; }

        public int Upvotes { get; set; }

        public List<QuestionVote> VotesForQuestion { get; set; }

        public Question()
        {
            Answers = new List<Answer>();
            Tags = new List<QuestionTag>();
        }
    }
}