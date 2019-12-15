using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace Belt_Exam.Models
{
    public class Participation
    {
        [Key]
        public int ParticipationId {get;set;}

        public int UserId {get;set;}
        public User Participant {get;set;}
        
        public int DojoActivityId {get;set;}
        public DojoActivity DojoActivity {get;set;}

        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;
    }
}