
using System.ComponentModel.DataAnnotations;
using Cou_project.Helpers;
using Microsoft.AspNet.Identity;

namespace Cou_project.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }


        private PasswordHasher hasher = new PasswordHasher();
        
        public string getHashPassword()
        {
            string hashpwd = hasher.HashPassword(Password);
            return hashpwd;
        }
    }
    
}