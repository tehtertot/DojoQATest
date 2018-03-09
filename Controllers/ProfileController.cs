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
using System.Threading.Tasks;
using System;
using System.IO;

namespace DojoQA.Controllers
{
    [Authorize(Policy = "ApiUser")]
    [Route("/profile")]
    public class ProfileController : Controller
    {
        private QAContext _context;
        private ClaimsPrincipal _caller;
        private UserManager<ApplicationUser> _userManager;
        
        public ProfileController(QAContext context, IHttpContextAccessor contextAccess, UserManager<ApplicationUser> um) {
            _caller = contextAccess.HttpContext.User;
            _context = context;
            _userManager = um;
        }

        [HttpGet("")]
        public ApplicationUser ShowUserInfo() {
            return GetUser();
        }

        [HttpGet("userid")]
        public JsonResult GetUserId() {
            return Json(_caller.Claims.Single(c => c.Type == "id").Value);
        }

        [HttpPost("update")]
        public ApplicationUser UpdateUser([FromBody] RegisterUser userInfo) {
            ApplicationUser user = GetUser();

            //logged in user is only editing own profile
            if (user.Email == userInfo.Email) {
                user.FirstName = userInfo.FirstName;
                user.LastName = userInfo.LastName;
                user.CurrentStack = (CurrentStack) userInfo.CurrentStack;
                user.LinkedInAccountURL = userInfo.LinkedInAccountURL;
                // user.PasswordHash = userInfo.Password;
                _context.SaveChanges();
            }

            return user;
        }

        [HttpPost("changepw")]
        public async Task<IActionResult> ChangeUserPassword([FromBody] RegisterUser userInfo) {
            ApplicationUser user = GetUser();
            var updated = await _userManager.ChangePasswordAsync(user, userInfo.Password, userInfo.NewPassword);
            if (updated.Succeeded) {
                return new OkObjectResult(true);
            }
            return BadRequest(false);
        }

        [HttpPost("updatePic")]
        public void UploadPhoto([FromBody] IFormFile file) {
            if (file == null) throw new Exception("File is null");
            if (file.Length == 0) throw new Exception("File is empty");

            using (Stream stream = file.OpenReadStream())
            {
                using (var binaryReader = new BinaryReader(stream))
                {
                    var fileContent = binaryReader.ReadBytes((int)file.Length);
                    // await _uploadService.AddFile(fileContent, file.FileName, file.ContentType);
                }
            }
        }

        private ApplicationUser GetUser() {
            string userId = _caller.Claims.Single(c => c.Type == "id").Value;
            return _context.Users.SingleOrDefault(u => u.Id == userId);
        }
    }
}