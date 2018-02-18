using System;

namespace DojoQA.Models
{
    public class AnswerView {
        public int AnswerId { get; set; }
        public string AnswerText { get; set; }
        public string AnsweredByName { get; set; }
        public string AnsweredById { get; set; }
        public int Votes { get; set; }
        public DateTime AnsweredDate { get; set; }
    }
}