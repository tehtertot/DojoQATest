using System.Collections.Generic;
using System.Runtime.Serialization;
using Microsoft.AspNetCore.Identity;

namespace DojoQA.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public Dojo Dojo { get; set; }

        public string LinkedInAccountURL { get; set; }

        public CurrentStack? CurrentStack { get; set; }

        public List<Question> QuestionsAsked { get; set; }

        public List<Answer> AnswersProvided { get; set; }

        public List<QuestionVote> QuestionsVotedOn { get; set; }

        public List<AnswerVote> AnswersVotedOn { get; set; }
    }

    public enum CurrentStack {
        [EnumMember(Value="Web Fundamentals")]
        WebFundamentals, 
        Python, 
        [EnumMember(Value="C#")]
        CSharp, 
        Java, 
        MEAN
    }
}