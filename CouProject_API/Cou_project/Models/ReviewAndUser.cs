using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class ReviewAndUser
    {
        public Review Review { get; set; }
        public User User { get; set; }

        public ReviewAndUser()
        {
            
        }

        public ReviewAndUser(Review review, User user)
        {
            Review = review;
            User = user;
        }

        public ReviewAndUser(SqlDataReader reader)
        {
            Review.Id = Convert.ToInt32(reader[ReviewDAO.FIELD_ID].ToString());
            Review.Star = (float) Convert.ToDouble(reader[ReviewDAO.FIELD_STAR].ToString());
            Review.Comment = reader[ReviewDAO.FIELD_COMMENT].ToString();
            Review.IsValid = Convert.ToInt32(reader[ReviewDAO.FIELD_ISVALID].ToString());
            Review.IdUser = Convert.ToInt32(reader[ReviewDAO.FIELD_IDUSER].ToString());
            Review.IdPlace = Convert.ToInt32(reader[ReviewDAO.FIELD_IDPLACE].ToString());
            Review.Date = reader[ReviewDAO.FIELD_DATE].ToString();
            
            User.Id = Convert.ToInt32(reader[UserDAO.FIELD_ID].ToString());
            User.Name = reader[UserDAO.FIELD_NAME].ToString();
            User.Surname = reader[UserDAO.FIELD_SURNAME].ToString();
            User.Pseudo = reader[UserDAO.FIELD_PSEUDO].ToString();
            User.Type = reader[UserDAO.FIELD_TYPE].ToString();
            User.Email = reader[UserDAO.FIELD_EMAIL].ToString();
            User.Hashpwd = reader[UserDAO.FIELD_HASHPWD].ToString();
            User.Idadr = Convert.ToInt32(reader[UserDAO.FIELD_IDADR].ToString());
        }
    }
}