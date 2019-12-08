using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Cou_project.DAO;
using Cou_project.Helpers;
using Cou_project.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;



namespace Cou_project.Services
{
    public interface IUserService
   
    {
        User Authenticate(User user);
        User CreateUserAndAddress(UserAndAddress user); 
        User Get(int id);
        UserAndAddress GetUserWithAddress(int id);
        IEnumerable<UserAndAddress> GetUsersWithAddress();
    }

    public class UserService : IUserService
   
    {

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        //Passé un user en argument ! 
        public User Authenticate(User user)
        {
            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user.WithoutPassword();
        }
        
        public User CreateUserAndAddress(UserAndAddress user)
        {
            Address adr = AddressDAO.Create(user.Address);
               
            user.User.Idadr = adr.Id;
            return UserDAO.Create(user.User);
            
        }
        
        public User Get(int id)
        {
            return UserDAO.Get(id).WithoutPassword();
        }

        public UserAndAddress GetUserWithAddress(int id)
        {
            User user = Get(id);
            return new UserAndAddress(user,AddressDAO.Get(user.Idadr));
        }

        public IEnumerable<UserAndAddress> GetUsersWithAddress()
        {
            IEnumerable<User> users = UserDAO.Query();
            UserAndAddress[]usersWithAddress = new UserAndAddress[users.Count()];
            int i = 0;
            foreach (var user in users)
            {
                usersWithAddress[i] = GetUserWithAddress(user.Id);
                i++;
            }
            return usersWithAddress;
        }
    }
}