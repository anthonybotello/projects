using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
namespace Belt_Exam.Models
{
    public class User
    {
        [Key]
        public int UserId {get;set;}

        [Required(ErrorMessage="Name is required.")]
        [MinLength(2,ErrorMessage="Name must be at least 2 characters.")]
        public string Name {get;set;}

        [Required(ErrorMessage="Email address is required.")]
        [EmailAddress(ErrorMessage="Enter a valid email address.")]
        public string Email {get;set;}

        [Required(ErrorMessage="Password is required.")]
        [MinLength(8,ErrorMessage="Password must be at least 8 characters long.")]
        [DataType(DataType.Password)]
        [SpecialPassword]
        public string Password {get;set;}
        
        public DateTime CreatedAt {get;set;} = DateTime.Now;
        public DateTime UpdatedAt {get;set;} = DateTime.Now;

        [NotMapped]
        [DataType(DataType.Password)]
        [Compare("Password",ErrorMessage="Passwords do not match.")]
        public string Confirm {get;set;}

        public List<DojoActivity> Coordinating {get;set;}

        public List<Participation> DojoActivities {get;set;}
    }

    public class SpecialPasswordAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                string numbers = "0123456789";
                string specials = "!@#$%^&*()_-=+";
                bool letter = false;
                bool number = false;
                bool special = false;

                foreach(char c in letters)
                {
                    if (((string)value).Contains(c))
                    {
                        letter = true;
                        break;
                    }
                }
                foreach(char c in numbers)
                {
                    if (((string)value).Contains(c))
                    {
                        number = true;
                        break;
                    }
                }
                foreach(char c in specials)
                {
                    if (((string)value).Contains(c))
                    {
                        special = true;
                        break;
                    }
                }

                if(letter == true && number == true && special == true)
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult("Password must contain at least 1 letter, 1 number, and 1 special character");
                }
            }
            else
            {
                return ValidationResult.Success;
            }
        }
    }
}