
using System.ComponentModel.DataAnnotations;
using Cou_project.Helpers;

namespace Cou_project.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}