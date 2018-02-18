using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DojoQA.Models
{
    public class QuestionWithAnswersViewModel
    {
        public int QuestionId { get; set; }
        public string QuestionTitle { get; set; }
        public string QuestionText { get; set; }
        public List<AnswerView> Answers { get; set; }
        public int Votes { get; set; }
        public Boolean CanVote { get; set; }
        public string AskedById { get; set; }
        public string AskedByFirstName { get; set; }
        public string AskedByLastName { get; set; }
        public DateTime CreatedAt { get; set; }
        // public List<TagViewModel> Tags { get; set; }
        public List<string> TagsString { get; set; }

        public QuestionWithAnswersViewModel() { }

        public QuestionWithAnswersViewModel(Question question) {
            QuestionId = question.QuestionId;
            QuestionTitle = question.QuestionTitle;
            QuestionText = question.QuestionText;
            Votes = question.Upvotes;
            AskedById = question.AskedBy.Id;
            AskedByFirstName = question.AskedBy.FirstName;
            AskedByLastName = question.AskedBy.LastName;
            CreatedAt = question.CreatedAt;
            Answers = new List<AnswerView>();
            addAnswers(question.Answers);
            // Tags = new List<TagViewModel>();   
            TagsString = new List<string>();
            addTags(question.Tags); 
        }

        private void addAnswers(List<Answer> allAnswers) {
            foreach (Answer a in allAnswers) {
                AnswerView av = new AnswerView();
                av.AnsweredById = a.AnsweredBy.Id;
                av.AnsweredByName = a.AnsweredBy.FirstName + " " + a.AnsweredBy.LastName;
                av.AnswerId = a.AnswerId;
                av.AnswerText = a.AnswerText;
                av.AnsweredDate = a.CreatedAt;
                av.Votes = a.Votes;
                Answers.Add(av);
            }
        }

        private void addTags(List<QuestionTag> allTags) {
            foreach (QuestionTag tag in allTags) {
                TagsString.Add(tag.Tag.Name);
            }
            // foreach (QuestionTag tag in allTags) {
            //     TagViewModel tvm = new TagViewModel();
            //     tvm.tagId = tag.TagId;
            //     tvm.name = tag.Tag.Name;
            //     tvm.categoryId = tag.Tag.Category.CategoryId;
            //     tvm.categoryName = tag.Tag.Category.Name;
            //     Tags.Add(tvm);
            // }
        }
    }

    
}