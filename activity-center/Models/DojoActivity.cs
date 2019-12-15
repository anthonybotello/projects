using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace Belt_Exam.Models
{
    public class DojoActivity
    {
        [Key]
        public int DojoActivityId {get;set;}

        [Required(ErrorMessage="A title is required.")]
        [Display(Name = "Activity")]
        public string Title {get;set;}

        [Required(ErrorMessage="A description is required.")]
        [Display(Name = "Description")]
        public string Description {get;set;}

        [Display(Name = "Duration")]
        public int? DurationValue {get;set;}

        public string DurationUnit {get;set;}


        [DataType(DataType.Date)]
        [Display(Name = "Date")]
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy}")]
        [FutureDate]
        public DateTime Date {get;set;}
        
        [DataType(DataType.Time)]
        [Display(Name = "Time")]
        [DisplayFormat(DataFormatString = "{0:h:mm tt}")]
        public DateTime Time {get;set;}

        public int UserId {get;set;}
        public User Coordinator {get;set;}

        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;

        public List<Participation> Participants {get;set;}
    }

    public class FutureDateAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                if (DateTime.Compare(((DateTime)value).Date, DateTime.Now.Date) <= 0)
                {
                    return new ValidationResult("Activity date must be in the future.");
                }
                return ValidationResult.Success;
            }
            else
            {
                return ValidationResult.Success;
            }
        }
    }
}