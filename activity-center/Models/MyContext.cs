using Microsoft.EntityFrameworkCore;
 
namespace Belt_Exam.Models
{
    public class MyContext : DbContext
    {
        // base() calls the parent class' constructor passing the "options" parameter along
        public MyContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users {get;set;}
        public DbSet<DojoActivity> DojoActivities {get;set;}
        public DbSet<Participation> Participations {get;set;}
    }
}