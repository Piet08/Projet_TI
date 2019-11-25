using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Utilisateur
    {

        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Pseudo { get; set; }
        public string Type { get; set; }
        public string Email { get; set; }
        public string Hashpwd { get; set; }
        public int Idadr { get; set; }
        
        public string Token { get; set; }

        public Utilisateur()
        {
        }

        public Utilisateur(int id, string nom, string prenom, string pseudo, string type, string email, string hashpwd, int idadr)
        {
            Id = id;
            Nom = nom;
            Prenom = prenom;
            Pseudo = pseudo;
            Type = type;
            Email = email;
            Hashpwd = hashpwd;
            Idadr = idadr;
        }
        
        public Utilisateur(int id, string nom, string prenom, string pseudo, string type, string email, string hashpwd, int idadr, string token)
        {
            Id = id;
            Nom = nom;
            Prenom = prenom;
            Pseudo = pseudo;
            Type = type;
            Email = email;
            Hashpwd = hashpwd;
            Idadr = idadr;
            Token = token;
        }
        
        public Utilisateur(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[UtilisateurDAO.FIELD_ID].ToString());
            Nom = reader[UtilisateurDAO.FIELD_NOM].ToString();
            Prenom = reader[UtilisateurDAO.FIELD_PRENOM].ToString();
            Pseudo = reader[UtilisateurDAO.FIELD_PSEUDO].ToString();
            Type = reader[UtilisateurDAO.FIELD_TYPE].ToString();
            Email = reader[UtilisateurDAO.FIELD_EMAIL].ToString();
            Hashpwd = reader[UtilisateurDAO.FIELD_HASHPWD].ToString();
            Idadr = Convert.ToInt32(reader[UtilisateurDAO.FIELD_IDADR].ToString());
        }
    }
}