
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DojoQA.Models;
using DojoQA.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DojoQA.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("/questions")]
    public class QuestionController : Controller
    {
        private QAContext _context;
        private ClaimsPrincipal _caller;
        
        public QuestionController(QAContext context, IHttpContextAccessor contextAccess) {
            _caller = contextAccess.HttpContext.User;
            _context = context;
        }

        // **************************** QUESTIONS ******************************* //
        [HttpGet("")]
        public List<QuestionWithAnswersViewModel> getAllQuestions() {
            List<Question> allQuestions = _context.Questions.Include(q => q.AskedBy).Include(q => q.Answers).ThenInclude(a => a.AnsweredBy).Include(q => q.Tags).ThenInclude(t => t.Tag).ThenInclude(x => x.StackCategory).OrderByDescending(q => q.CreatedAt).ToList();
            List<QuestionWithAnswersViewModel> allQuestionsForView = new List<QuestionWithAnswersViewModel>();
            foreach (Question q in allQuestions) {
                allQuestionsForView.Add(new QuestionWithAnswersViewModel(q));
            }
            return allQuestionsForView;
        }

        [HttpPost("new")]
        public bool addQuestion([FromBody] QuestionFromClient question) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            ApplicationUser user = _context.Users.SingleOrDefault(u => u.Id == userId);
            Question q = new Question();
            q.AskedBy = user;
            q.QuestionTitle = question.QuestionTitle;
            q.QuestionText = question.QuestionText;
            // add tags to question model (relationships  will be saved when question is saved)
            foreach (int id in question.Tags) {
                q.Tags.Add(new QuestionTag(id));
            }
            try {
                _context.Questions.Add(q);
                _context.SaveChanges();
                return true;
            }
            catch {
                return false;
            }
        }

        [HttpGet("{id:int}")]
        public QuestionWithAnswersViewModel getQuestion(int id) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            
            //get full question from db (with all joins)
            Question question = _context.Questions.Include(q => q.Tags).ThenInclude(qt => qt.Tag).ThenInclude(t => t.StackCategory).Include(q => q.AskedBy).Include(q => q.Answers).ThenInclude(a => a.AnsweredBy).SingleOrDefault(q => q.QuestionId == id);
            
            //transform into view model
            QuestionWithAnswersViewModel returnedQ =  new QuestionWithAnswersViewModel(question);
            
            //check if user has voted
            returnedQ.CanVote = _context.QuestionVotes.SingleOrDefault(q => q.QuestionId == id && q.UserId == userId) == null;
            
            return returnedQ;
        }

        [HttpPost("edit")]
        public bool editQuestion([FromBody] QuestionFromClient question) {
            try {
                Question qToUpdate = _context.Questions.Single(q => q.QuestionId == question.QuestionId);
                qToUpdate.QuestionTitle = question.QuestionTitle;
                qToUpdate.QuestionText = question.QuestionText;
                _context.SaveChanges();
                return true;
            }
            catch {
                return false;
            }
        }

        [HttpGet("vote/{id:int}")]
        public bool upvoteQuestion(int id) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            Question question = _context.Questions.SingleOrDefault(q => q.QuestionId == id);

            //if user has not already voted for
            if (_context.QuestionVotes.SingleOrDefault(q => q.QuestionId == id && q.UserId == userId) == null) {
                QuestionVote qv = new QuestionVote();
                qv.QuestionId = id;
                qv.UserId = userId;
                question.Upvotes++;
                _context.QuestionVotes.Add(qv);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        // **************************** ANSWERS ********************************* //
        [HttpPost("answer/{id:int}")]
        public QuestionWithAnswersViewModel addAnswer([FromBody] AnswerView answer, int id) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            ApplicationUser user = _context.Users.SingleOrDefault(u => u.Id == userId);
                
            Answer a = new Answer();
            a.AnsweredBy = user;
            a.AnswerText = answer.AnswerText;
            a.Question = _context.Questions.Single(q => q.QuestionId == id);
            _context.Answers.Add(a);
            _context.SaveChanges();
            return new QuestionWithAnswersViewModel(_context.Questions.Include(q => q.AskedBy).Include(q => q.Answers).Include(q => q.Tags).ThenInclude(t => t.Tag).ThenInclude(x => x.StackCategory).Single(q => q.QuestionId == id));
        }

        [HttpPost("answer/edit")]
        public bool editAnswer([FromBody] AnswerView answer) {
            try {
                Answer aToUpdate = _context.Answers.Single(a => a.AnswerId == answer.AnswerId);
                aToUpdate.AnswerText = answer.AnswerText;
                _context.SaveChanges();
                return true;
            }
            catch {
                return false;
            }
        }

        [HttpGet("answer/delete/{id:int}")]
        public bool deleteAnswer(int id) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            ApplicationUser user = _context.Users.SingleOrDefault(u => u.Id == userId);
            Answer answerToDelete = _context.Answers.SingleOrDefault(a => a.AnsweredBy == user && a.AnswerId == id);
            if (answerToDelete != null) {
                //delete associated votes
                _context.AnswerVotes.RemoveRange(_context.AnswerVotes.Where(a => a.AnswerId == id));
                _context.Answers.Remove(answerToDelete);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        [HttpGet("answer/vote/{id:int}")]
        public bool upvoteAnswer(int id) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            Answer answer = _context.Answers.SingleOrDefault(a => a.AnswerId == id);

            //check that user has not already voted for this answer
            if (_context.AnswerVotes.SingleOrDefault(a => a.AnswerId == id && a.UserId == userId) == null) {
                AnswerVote av = new AnswerVote();
                av.AnswerId = id;
                av.UserId = userId;
                answer.Votes++;
                _context.AnswerVotes.Add(av);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        // ******************************* TAGS ********************************* //
        [HttpGet("tags")]
        public List<CategoryWithTagsViewModel> getAllTagsWithCategories() {
            List<StackCategory> allCategories = _context.StackCategories.Include(c => c.AssociatedTags).OrderBy(c => c.SortOrder).ToList();
            List<CategoryWithTagsViewModel> categoriesWithTags = new List<CategoryWithTagsViewModel>();
            foreach (StackCategory c in allCategories)
            {
                CategoryWithTagsViewModel cwtvm = new CategoryWithTagsViewModel(c);
                categoriesWithTags.Add(cwtvm);
            }
            return categoriesWithTags;
        }

        // [HttpGet("tags/{category:string}")]
        // public CategoryWithTagsViewModel getTagsByCategory(string category) {
        //     Category cat = _context.Categories.Include(c => c.AssociatedTags).SingleOrDefault(c => c.Name == category);
        //     return new CategoryWithTagsViewModel(cat);
        // }
    }
}