using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Pseudo { get; set; }
        public string Type { get; set; }
        public string Email { get; set; }
        public string Hashpwd { get; set; }
        public int Idadr { get; set; }
        
        public string Token { get; set; }

        public User()
        {
        }

        public User(int id, string name, string surname, string pseudo, string type, string email, string hashpwd, int idadr)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Pseudo = pseudo;
            Type = type;
            Email = email;
            Hashpwd = hashpwd;
            Idadr = idadr;
        }
        
        public User(int id, string name, string surname, string pseudo, string type, string email, string hashpwd, int idadr, string token)
        {
            Id = id;
            Name = name;
            Surname = surname;
            Pseudo = pseudo;
            Type = type;
            Email = email;
            Hashpwd = hashpwd;
            Idadr = idadr;
            Token = token;
        }
        
        public User(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[UserDAO.FIELD_ID].ToString());
            Name = reader[UserDAO.FIELD_NAME].ToString();
            Surname = reader[UserDAO.FIELD_SURNAME].ToString();
            Pseudo = reader[UserDAO.FIELD_PSEUDO].ToString();
            Type = reader[UserDAO.FIELD_TYPE].ToString();
            Email = reader[UserDAO.FIELD_EMAIL].ToString();
            Hashpwd = reader[UserDAO.FIELD_HASHPWD].ToString();
            Idadr = Convert.ToInt32(reader[UserDAO.FIELD_IDADR].ToString());
        }
    }
}