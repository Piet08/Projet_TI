using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Avis
    {
        public int Id { get; set; }
        public float Note { get; set; }
        public string Commentaire { get; set; }
        public int Valider { get; set; }
        public int Idutil { get; set; }
        public int Idlieu { get; set; }

        public Avis()
        {
        }

        public Avis(int id, float note, string commentaire, int valider, int idutil, int idlieu)
        {
            Id = id;
            Note = note;
            Commentaire = commentaire;
            Valider = valider;
            Idutil = idutil;
            Idlieu = idlieu;
        }
        
        public Avis(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[AvisDAO.FIELD_ID].ToString());
            Note = (float) Convert.ToDouble(reader[AvisDAO.FIELD_NOTE].ToString());
            Commentaire = reader[AvisDAO.FIELD_COMMENTAIRE].ToString();
            Valider = Convert.ToInt32(reader[AvisDAO.FIELD_VALIDER].ToString());
            Idutil = Convert.ToInt32(reader[AvisDAO.FIELD_IDUTIL].ToString());
            Idlieu = Convert.ToInt32(reader[AvisDAO.FIELD_IDLIEU].ToString());
        }
    }
}