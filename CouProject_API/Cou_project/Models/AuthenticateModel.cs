
using System.ComponentModel.DataAnnotations;

namespace Cou_project.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }


        //private PasswordHasher hasher = new PasswordHasher();
        
        public string getHashPassword()
        {
             
            //return hasher.HashPassword(Password);
            return "";
        }
    }
    
}