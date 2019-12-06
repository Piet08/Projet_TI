using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class PlaceAndAddress
    {
        public Place Place { get; set; }
        public Address Address { get; set; }
        public double AvgRate { get; set; }

        public PlaceAndAddress(){}

        public PlaceAndAddress(Place place, Address address,double avgRate)
        {
            Place = place;
            Address = address;
            AvgRate = avgRate;
        }

        public PlaceAndAddress(SqlDataReader reader)
        {
            Address.Id = Convert.ToInt32(reader[AddressDAO.FIELD_ID].ToString());
            Address.City = reader[AddressDAO.FIELD_CITY].ToString();
            Address.Straat = reader[AddressDAO.FIELD_STRAAT].ToString();
            Address.Num = Convert.ToInt32(reader[AddressDAO.FIELD_NUM].ToString());
            Address.PostalCode = Convert.ToInt32(reader[AddressDAO.FIELD_POSTALCODE].ToString());
            
            Place.Id = Convert.ToInt32(reader[PlaceDAO.FIELD_ID].ToString());
            Place.Name = reader[PlaceDAO.FIELD_NAME].ToString();
            Place.Type = reader[PlaceDAO.FIELD_TYPE].ToString();
            Place.Description = reader[PlaceDAO.FIELD_DESCRIPTION].ToString();
            Place.IdAdr = Address.Id;

            AvgRate = 5;

        }
    }
}