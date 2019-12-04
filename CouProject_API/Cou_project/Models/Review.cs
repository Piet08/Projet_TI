using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Review
    {
        public int Id { get; set; }
        public float Star { get; set; }
        public string Comment { get; set; }
        public int IsValid { get; set; }
        public int IdUser { get; set; }
        public int IdPlace { get; set; }
        public string Date { get; set; }

        public Review()
        {
        }

        public Review(int id, float star, string comment, int isValid, int idUser, int idPlace, string date)
        {
            Id = id;
            Star = star;
            Comment = comment;
            IsValid = isValid;
            IdUser = idUser;
            IdPlace = idPlace;
            Date = date;
        }
        
        public Review(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[ReviewDAO.FIELD_ID].ToString());
            Star = (float) Convert.ToDouble(reader[ReviewDAO.FIELD_STAR].ToString());
            Comment = reader[ReviewDAO.FIELD_COMMENT].ToString();
            IsValid = Convert.ToInt32(reader[ReviewDAO.FIELD_ISVALID].ToString());
            IdUser = Convert.ToInt32(reader[ReviewDAO.FIELD_IDUSER].ToString());
            IdPlace = Convert.ToInt32(reader[ReviewDAO.FIELD_IDPLACE].ToString());
            Date = reader[ReviewDAO.FIELD_DATE].ToString();
        }
    }
}