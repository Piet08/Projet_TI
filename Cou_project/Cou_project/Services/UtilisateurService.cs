﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Cou_project.Helpers;
using Cou_project.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;



namespace Cou_project.Services
{
    public interface IUtilisateurService
   
    {
        Utilisateur Authenticate(string username, string password);
        IEnumerable<Utilisateur> GetAll();
    }

    public class UtilisateurService : IUtilisateurService
   
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Utilisateur> _users = new List<Utilisateur>
        { 
            new Utilisateur { Nom = "Test", Prenom = "Utilisateur", Pseudo = "test", Type = "test", Email = "test", Hashpwd = "test", Idadr = 0} 
        };

        private readonly AppSettings _appSettings;

        public UtilisateurService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public Utilisateur Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Pseudo == username && x.Hashpwd == password);

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

        public IEnumerable<Utilisateur> GetAll()
        {
            return _users.WithoutPasswords();
        }
    }
}