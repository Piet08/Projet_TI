using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Favorites
    {
        public int IdUser { get; set; }
        public int IdPlace { get; set; }

        public Favorites()
        {
        }

        public Favorites(int idUser, int idLieu)
        {
            IdUser = idUser;
            IdPlace = idLieu;
        }
        
        public Favorites(SqlDataReader reader)
        {
            IdUser = Convert.ToInt32(reader[UserDAO.FIELD_IDUSER].ToString());
            IdPlace = Convert.ToInt32(reader[UserDAO.FIELD_IDPLACE].ToString());
        }
    }
}