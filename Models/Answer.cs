using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DojoQA.Models
{
    public class Answer : BaseEntity
    {
        [Key]
        public int AnswerId { get; set; }

        [MinLength(10, ErrorMessage="Please provide a more descriptive answer.")]
        public string AnswerText { get; set; }

        public ApplicationUser AnsweredBy { get; set; }

        public Question Question { get; set; }

        public int Votes { get; set; }

        public List<AnswerVote> VotesForAnswer { get; set; }

        public Answer() { 
            VotesForAnswer = new List<AnswerVote>();
        }
    }
}