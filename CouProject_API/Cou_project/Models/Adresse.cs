using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Adresse
    {
        public int Id { get; set; }
        public string Ville { get; set; }
        public string Rue { get; set; }
        public int Num { get; set; }
        public int Cp { get; set; }

        public Adresse(int id, string ville, string rue, int num, int cp)
        {
            Id = id;
            Ville = ville;
            Rue = rue;
            Num = num;
            Cp = cp;
        }

        public Adresse()
        {
        }
        
        public Adresse(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[AdresseDAO.FIELD_ID].ToString());
            Ville = reader[AdresseDAO.FIELD_VILLE].ToString();
            Rue = reader[AdresseDAO.FIELD_RUE].ToString();
            Num = Convert.ToInt32(reader[AdresseDAO.FIELD_NUM].ToString());
            Cp = Convert.ToInt32(reader[AdresseDAO.FIELD_CP].ToString());
        }
    }
}