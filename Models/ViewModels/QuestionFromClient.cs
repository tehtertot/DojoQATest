namespace DojoQA.Models
{
    public class QuestionFromClient
    {
        public int QuestionId { get; set; }
        public string QuestionTitle { get; set; }
        public string QuestionText { get; set; }
        public TagViewModel[] Tags { get; set; }
    }
}