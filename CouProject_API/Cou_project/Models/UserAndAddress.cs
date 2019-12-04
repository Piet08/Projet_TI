using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class UserAndAddress
    {
        public User User { get; set; }
        
        public Address Address { get; set; }
        
        public UserAndAddress(){}

        public UserAndAddress(User user, Address address)
        {
            User = user;
            Address = address;
            
        }
        
        public UserAndAddress(SqlDataReader reader)
        {
            Address.Id = Convert.ToInt32(reader[AddressDAO.FIELD_ID].ToString());
            Address.City = reader[AddressDAO.FIELD_CITY].ToString();
            Address.Straat = reader[AddressDAO.FIELD_STRAAT].ToString();
            Address.Num = reader[AddressDAO.FIELD_NUM].ToString();
            Address.PostalCode = Convert.ToInt32(reader[AddressDAO.FIELD_POSTALCODE].ToString());
            
            User.Id = Convert.ToInt32(reader[UserDAO.FIELD_ID].ToString());
            User.Name = reader[UserDAO.FIELD_NAME].ToString();
            User.Surname = reader[UserDAO.FIELD_SURNAME].ToString();
            User.Pseudo = reader[UserDAO.FIELD_PSEUDO].ToString();
            User.Type = reader[UserDAO.FIELD_TYPE].ToString();
            User.Email = reader[UserDAO.FIELD_EMAIL].ToString();
            User.Hashpwd = reader[UserDAO.FIELD_HASHPWD].ToString();
            User.Idadr = Address.Id;
        }
    }
}