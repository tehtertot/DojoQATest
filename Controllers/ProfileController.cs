using System.Linq;
using System.Security.Claims;
using DojoQA.Auth;
using DojoQA.Models;
using DojoQA.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DojoQA.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("/profile")]
    public class ProfileController : Controller
    {
        private QAContext _context;
        private ClaimsPrincipal _caller;
        
        public ProfileController(QAContext context, IHttpContextAccessor contextAccess) {
            _caller = contextAccess.HttpContext.User;
            _context = context;
        }

        [HttpGet("")]
        public ApplicationUser showUserInfo() {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            return _context.Users.SingleOrDefault(u => u.Id == userId);
        }

        [HttpGet("userid")]
        public JsonResult getUserId() {
            return Json(_caller.Claims.Single(c => c.Type == "id").Value);
        }

        [HttpPost("update")]
        public ApplicationUser updateUser([FromBody] RegisterUser userInfo) {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            ApplicationUser user = _context.Users.SingleOrDefault(u => u.Id == userId);

            //logged in user is only editing own profile
            if (user.Email == userInfo.Email) {
                user.FirstName = userInfo.FirstName;
                user.LastName = userInfo.LastName;
                user.CurrentStack = (CurrentStack) userInfo.CurrentStack;
                user.LinkedInAccountURL = userInfo.LinkedInAccountURL;
                _context.SaveChanges();
            }

            return user;
        }
    }
}