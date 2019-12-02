using System;
using System.Data.SqlClient;
using Cou_project.DAO;

namespace Cou_project.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int IdAdr { get; set; }

        public Place()
        {
        }

        public Place(int id, string name, string type, string description, int idAdr)
        {
            Id = id;
            Name = name;
            Type = type;
            Description = description;
            IdAdr = idAdr;
        }
        
        
        public Place(SqlDataReader reader)
        {
            Id = Convert.ToInt32(reader[PlaceDAO.FIELD_ID].ToString());
            Name = reader[PlaceDAO.FIELD_NAME].ToString();
            Type = reader[PlaceDAO.FIELD_TYPE].ToString();
            Description = reader[PlaceDAO.FIELD_DESCRIPTION].ToString();
            IdAdr = Convert.ToInt32(reader[PlaceDAO.FIELD_IDADR].ToString());
        }
    }
}