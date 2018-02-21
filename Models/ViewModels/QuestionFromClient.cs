using System.Collections.Generic;

namespace DojoQA.Models
{
    public class QuestionFromClient
    {
        public int QuestionId { get; set; }
        public string QuestionTitle { get; set; }
        public string QuestionText { get; set; }
        public int[] Tags { get; set; }
    }
}