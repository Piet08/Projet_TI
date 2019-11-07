using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Lieu
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Idadr { get; set; }

        public Lieu()
        {
        }

        public Lieu(int id, string nom, string type, string description, int idadr)
        {
            Id = id;
            Nom = nom;
            Type = type;
            Description = description;
            Idadr = idadr;
        }
        
        
        public Lieu(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[LieuDAO.FIELD_ID].ToString());
            Nom = reader[LieuDAO.FIELD_NOM].ToString();
            Type = reader[LieuDAO.FIELD_TYPE].ToString();
            Description = reader[LieuDAO.FIELD_DESCRIPTION].ToString();
            Idadr = Convert.ToInt32(reader[LieuDAO.FIELD_IDADR].ToString());
        }
    }
}