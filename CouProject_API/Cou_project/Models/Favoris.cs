using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Favoris
    {
        public int Idutil { get; set; }
        public int Idlieu { get; set; }

        public Favoris()
        {
        }

        public Favoris(int idutil, int idLieu)
        {
            Idutil = idutil;
            Idlieu = idLieu;
        }
        
        public Favoris(SqlDataReader reader)
        {
            Idutil = Convert.ToInt32(reader[UtilisateurDAO.FIELD_IDUTIL].ToString());
            Idlieu = Convert.ToInt32(reader[UtilisateurDAO.FIELD_IDLIEU].ToString());
        }
    }
}