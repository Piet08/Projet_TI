using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class AddressDAO
    {
        public static readonly string TABLE_NAME = "Adresse";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_CITY = "ville";
        public static readonly string FIELD_STRAAT = "rue";
        public static readonly string FIELD_NUM = "num";
        public static readonly string FIELD_POSTALCODE = "cp";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 
        
        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";
        
        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}) OUTPUT Inserted.{5} VALUES (@{1}, @{2}, @{3}, @{4})",
            TABLE_NAME, FIELD_CITY, FIELD_STRAAT, FIELD_NUM, FIELD_POSTALCODE,FIELD_ID);
        
        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";
        
        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";
        
        private static readonly string REQ_UPDATE = String.Format("UPDATE {0} SET {1} = @{1}, {2} = @{2}, {3} = @{3}, {4} = @{4} WHERE {5} = @{5}",
            TABLE_NAME, FIELD_CITY, FIELD_STRAAT, FIELD_NUM, FIELD_POSTALCODE, FIELD_ID);
        
        
        public static IEnumerable<Address> Query()
        {
            List<Address> addresses = new List<Address>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    addresses.Add(new Address(reader));
                }
            }
            return addresses;
        }
        
        [HttpPost]
        public static Address Create(Address adr)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_CITY}", adr.City);
                command.Parameters.AddWithValue($"@{FIELD_STRAAT}", adr.Straat);
                command.Parameters.AddWithValue($"@{FIELD_NUM}", adr.Num);
                command.Parameters.AddWithValue($"@{FIELD_POSTALCODE}", adr.PostalCode);

                adr.Id = (int) command.ExecuteScalar();
            }
            return adr;
        }
        
        public static Address Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Address(reader) : null;
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
        public static bool Update(Address adr)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_CITY}", adr.City);
                command.Parameters.AddWithValue($"@{FIELD_STRAAT}", adr.Straat);
                command.Parameters.AddWithValue($"@{FIELD_NUM}", adr.Num);
                command.Parameters.AddWithValue($"@{FIELD_POSTALCODE}", adr.PostalCode);
                command.Parameters.AddWithValue($"@{FIELD_ID}", adr.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}