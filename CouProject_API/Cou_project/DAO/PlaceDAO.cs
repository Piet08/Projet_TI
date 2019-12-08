using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class PlaceDAO
    {
        public static readonly string TABLE_NAME = "Lieu";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_NAME = "nom";
        public static readonly string FIELD_TYPE = "type";
        public static readonly string FIELD_DESCRIPTION = "description";
        public static readonly string FIELD_IDADR = "idadr";
        public static readonly string FIELD_AVGRATE = "avgRate";
        
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 

        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";

        private static readonly string REQ_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}) OUTPUT Inserted.{5} VALUES (@{1}, @{2}, @{3}, @{4})",
            TABLE_NAME, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION, FIELD_IDADR, FIELD_ID);

        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_UPDATE = String.Format(
            "UPDATE {0} SET {1} = @{1}, {2} = @{2}, {3} = @{3}, {4} = @{4} WHERE {5} = @{5}",
            TABLE_NAME, FIELD_NAME, FIELD_TYPE, FIELD_DESCRIPTION, FIELD_IDADR, FIELD_ID);

        private static readonly string REQ_GET_AVGRATE = $"SELECT COALESCE(ROUND(AVG(a.note),2),'') as {FIELD_AVGRATE} FROM {TABLE_NAME} l " +
                                                         $"INNER JOIN Avis a on l.id = a.idlieu where l.id = @{FIELD_ID}";

        public static IEnumerable<Place> Query()
        {
            List<Place> places = new List<Place>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    places.Add(new Place(reader));
                }
            }
            return places;
        }

        public static double GetAvgRate(int id)
        {
            double avgRate = 0;
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET_AVGRATE;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);
                SqlDataReader reader = command.ExecuteReader();
                reader.Read();
                avgRate = Convert.ToDouble(reader[FIELD_AVGRATE].ToString());
            }
            
            return avgRate;
        }
        //Attention l'IDADR doit se trouver dans la BD pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Place Create(Place place)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_POST;

                command.Parameters.AddWithValue($"@{FIELD_NAME}", place.Name);
                command.Parameters.AddWithValue($"@{FIELD_TYPE}", place.Type);
                command.Parameters.AddWithValue($"@{FIELD_DESCRIPTION}", place.Description);
                command.Parameters.AddWithValue($"@{FIELD_IDADR}", place.IdAdr);

                place.Id = (int) command.ExecuteScalar();
            }
            return place;
        }
        public static Place Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Place(reader) : null;
            }
        }
        public static bool Delete(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_DELETE;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                return command.ExecuteNonQuery() == 1;
            }
        }
        public static bool Update(Place place)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_NAME}", place.Name);
                command.Parameters.AddWithValue($"@{FIELD_TYPE}", place.Type);
                command.Parameters.AddWithValue($"@{FIELD_DESCRIPTION}", place.Description);
                command.Parameters.AddWithValue($"@{FIELD_IDADR}", place.IdAdr);
                command.Parameters.AddWithValue($"@{FIELD_ID}", place.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}