using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Belt_Exam.Models;
namespace Belt_Exam.Controllers
{
    public class LoginController : Controller
    {
        private MyContext dbContext;

        public LoginController(MyContext context)
        {
            dbContext = context;
        }

        public bool LoggedIn()
        {
            if (HttpContext.Session.GetString("CurrentUser") == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        [HttpGet("")]
        public IActionResult Index()
        {
            if (LoggedIn())
            {
                return RedirectToAction("Success");
            }
            else
            {
                return View();
            }
        }

        [HttpPost("register")]
        public IActionResult Register(User newUser)
        {
            if (ModelState.IsValid)
            {
                if (dbContext.Users.Any(u => u.Email == newUser.Email))
                {
                    ModelState.AddModelError("Email","This email is already in use.");
                    return View("Index");
                }
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                newUser.Password = Hasher.HashPassword(newUser, newUser.Password);
                dbContext.Users.Add(newUser);
                dbContext.SaveChanges();
                HttpContext.Session.SetObjectAsJson("CurrentUser",newUser);
                return RedirectToAction("Success");
            }
            else
            {
                if (dbContext.Users.Any(u => u.Email == newUser.Email))
                {
                    ModelState.AddModelError("Email","This email is already in use.");
                }
                return View("Index");
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginUser loginUser)
        {
            if (ModelState.IsValid)
            {
                User userInDb = dbContext.Users.FirstOrDefault(user => user.Email == loginUser.LoginEmail);
                if (userInDb == null)
                {
                    ModelState.AddModelError("LoginEmail","Invalid email address.");
                    return View("Index");
                }

                PasswordHasher<LoginUser> Hasher = new PasswordHasher<LoginUser>();
                var result = Hasher.VerifyHashedPassword(loginUser, userInDb.Password, loginUser.LoginPassword);

                if (result == 0)
                {
                    ModelState.AddModelError("LoginPassword","Invalid password.");
                    return View("Index");
                }
                HttpContext.Session.SetObjectAsJson("CurrentUser", userInDb);
                return RedirectToAction("Success");
            }
            else
            {
                return View("Index");
            }
        }

        [HttpGet("guest")]
        public IActionResult Guest(){
            User guest = dbContext.Users.FirstOrDefault(user => user.Email == "guest@email.com");
            HttpContext.Session.SetObjectAsJson("CurrentUser",guest);
            return RedirectToAction("Success");
        }

        [HttpGet("success")]
        public IActionResult Success()
        {
            
            return Redirect("Home");
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
    }
}
