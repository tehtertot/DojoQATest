using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DojoQA.Auth;
using DojoQA.Helpers;
using DojoQA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace DojoQA.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions; 
        
        public HomeController(UserManager<ApplicationUser> um, JwtFactory jwf, IOptions<JwtIssuerOptions> jwo) {
            _userManager = um;
            _jwtFactory = jwf;
            _jwtOptions = jwo.Value;
        }

        // [AllowAnonymous]
        // public IActionResult Index()
        // {
        //     //send up Dojo list to populate dropdown selection
        //     return View();
        // }

        [HttpPost("/RegisterUser")]
        [AllowAnonymous]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUser user)
        {
            //really the only backend validations should be existing email (or username, when I get to that)
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            //front end validations should already be taken care of
            ApplicationUser newUser = new ApplicationUser {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.Email,
                Email = user.Email,
                CurrentStack = (CurrentStack) user.CurrentStack
            };
            IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);
            if (result.Succeeded) {
                ClaimsIdentity identity = await GetClaimsIdentity(user.Email, user.Password);
                var token = await GetJwtToken(identity, user.Email);
                return new OkObjectResult(token);
            }
            ModelState.AddModelError("registration", "email is already registered");
            return BadRequest(ModelState);
        }

        [HttpPost("/LoginUser")]
        [AllowAnonymous]
        public async Task<IActionResult> LogInUser([FromBody] LoginUser login) {
            
            //should be captured by front-end validations, but just to be sure
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            
            ClaimsIdentity identity = await GetClaimsIdentity(login.Email, login.Password);
            if (identity == null) {
                ModelState.AddModelError("login", "Invalid username and/or password");
                return BadRequest(ModelState);
            }

            var token = await GetJwtToken(identity, login.Email);
            return new OkObjectResult(token);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string email, string password) {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)) {
                return await Task.FromResult<ClaimsIdentity>(null);
            }

            ApplicationUser userToVerify = await _userManager.FindByEmailAsync(email);

            //no user with matching email
            if (userToVerify == null) {
                return await Task.FromResult<ClaimsIdentity>(null); 
            }

            //password is correct
            if (await _userManager.CheckPasswordAsync(userToVerify, password)) {
                return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(email, userToVerify.Id));
            }

            //any other errors (i.e. password is incorrect)
            return await Task.FromResult<ClaimsIdentity>(null);
        }

        private async Task<string> GetJwtToken(ClaimsIdentity identity, string email) {
            return await Tokens.GenerateJwt(identity, _jwtFactory, email, _jwtOptions, new JsonSerializerSettings { Formatting = Formatting.Indented });
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
