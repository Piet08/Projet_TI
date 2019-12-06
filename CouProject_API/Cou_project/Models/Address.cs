using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Straat { get; set; }
        public int Num { get; set; }
        public int PostalCode { get; set; }
        
        public Address(int id, string city, string straat, int num, int postalCode)
        {
            Id = id;
            City = city;
            Straat = straat;
            Num = num;
            PostalCode = postalCode;
        }

        public Address()
        {
        }
        
        public Address(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[AddressDAO.FIELD_ID].ToString());
            City = reader[AddressDAO.FIELD_CITY].ToString();
            Straat = reader[AddressDAO.FIELD_STRAAT].ToString();
            Num = Convert.ToInt32(reader[AddressDAO.FIELD_NUM].ToString());
            PostalCode = Convert.ToInt32(reader[AddressDAO.FIELD_POSTALCODE].ToString());
        }
    }
}