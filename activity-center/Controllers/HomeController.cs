using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Belt_Exam.Models;

namespace Belt_Exam.Controllers
{
    public class HomeController : Controller
    {
        private readonly MyContext _context;

        public HomeController(MyContext context)
        {
            _context = context;
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

        public User CurrentUser()
        {
            User currentUser = HttpContext.Session.GetObjectFromJson<User>("CurrentUser");
            return currentUser;
        }

        // GET: Home
        public async Task<IActionResult> Index()
        {
            ViewBag.User = CurrentUser();
            if (LoggedIn())
            {
                List<DojoActivity> pastDate = _context.DojoActivities
                .Where(a => DateTime.Compare(a.Date,DateTime.Now) < 0).ToList();

                List<DojoActivity> myContext = _context.DojoActivities.Include(d => d.Coordinator).Include(d => d.Participants).ThenInclude(p => p.Participant).Except(pastDate).OrderBy(d => d.Date.AddTicks(d.Time.Ticks)).ToList();
                    return View(myContext);
            }
            else
            {
                return RedirectToAction("Index","Login");
            }
            
            
        }

        // GET: Home/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            ViewBag.User = CurrentUser();
            if(LoggedIn())
            {
            if (id == null)
            {
                return NotFound();
            }

            var dojoActivity = await _context.DojoActivities
                .Include(d => d.Coordinator)
                .Include(d => d.Participants)
                .ThenInclude(p => p.Participant)
                .FirstOrDefaultAsync(m => m.DojoActivityId == id);
            if (dojoActivity == null)
            {
                return NotFound();
            }

            return View(dojoActivity);}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        // GET: Home/Create
        public IActionResult Create()
        {
            ViewBag.User = CurrentUser();
            if(LoggedIn())
            {
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email");
            return View();}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        // POST: Home/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("DojoActivityId,Title,Description,DurationValue,DurationUnit,Date,Time,UserId")] DojoActivity dojoActivity)
        {
            if(LoggedIn())
            {
            ViewBag.User = CurrentUser();
            if (ModelState.IsValid)
            {
                _context.Add(dojoActivity);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Details),new{id=dojoActivity.DojoActivityId});
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", dojoActivity.UserId);
            return View(dojoActivity);}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        // GET: Home/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (LoggedIn())
            {
            ViewBag.User = CurrentUser();
            if (id == null)
            {
                return NotFound();
            }

            var dojoActivity = await _context.DojoActivities.FindAsync(id);
            if (dojoActivity == null)
            {
                return NotFound();
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", dojoActivity.UserId);
            return View(dojoActivity);}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        // POST: Home/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("DojoActivityId,Title,Description,DurationValue,DurationUnit,Date,Time,UserId")] DojoActivity dojoActivity)
        {
            if(LoggedIn())
            {
            if (id != dojoActivity.DojoActivityId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dojoActivity);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DojoActivityExists(dojoActivity.DojoActivityId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", dojoActivity.UserId);
            return View(dojoActivity);}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        // GET: Home/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if(LoggedIn())
            {
            ViewBag.User = CurrentUser();
            if (id == null)
            {
                return NotFound();
            }

            var dojoActivity = await _context.DojoActivities
                .Include(d => d.Coordinator)
                .FirstOrDefaultAsync(m => m.DojoActivityId == id);
            if (dojoActivity == null)
            {
                return NotFound();
            }

            return View(dojoActivity);}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        // POST: Home/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if(LoggedIn())
            {
            var dojoActivity = await _context.DojoActivities.FindAsync(id);
            _context.DojoActivities.Remove(dojoActivity);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        private bool DojoActivityExists(int id)
        {
            return _context.DojoActivities.Any(e => e.DojoActivityId == id);
        }

        [Route("Join/{userId}/{activityId}",Name = "join")]
        public IActionResult Join(int userId, int activityId)
        {
            if(LoggedIn())
            {
            Participation newPart = new Participation();
                newPart.UserId = userId;
                newPart.DojoActivityId = activityId;
                _context.Participations.Add(newPart);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));}
            else
            {
                return RedirectToAction("Index","Login");
            }
        }

        public IActionResult Leave(int id)
        {
            if(LoggedIn())
            {
            Participation part = _context.Participations.FirstOrDefault(p => p.ParticipationId == id);
            _context.Participations.Remove(part);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));}
            else
            {
                return RedirectToAction("Index","Login");
            } 
        }
    }
}
