using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class AdresseDAO
    {
        public static readonly string TABLE_NAME = "Adresse";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_VILLE = "ville";
        public static readonly string FIELD_RUE = "rue";
        public static readonly string FIELD_NUM = "num";
        public static readonly string FIELD_CP = "cp";
        public static readonly string FIELD_DATE = "date";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 
        
        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";
        
        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}) OUTPUT Inserted.{5} VALUES (@{1}, @{2}, @{3}, @{4},@{5})",
            TABLE_NAME, FIELD_VILLE, FIELD_RUE, FIELD_NUM, FIELD_CP, FIELD_ID,FIELD_DATE);
        
        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";
        
        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";
        
        private static readonly string REQ_UPDATE = String.Format("UPDATE {0} SET {1} = @{1}, {2} = @{2}, {3} = @{3}, {4} = @{4}, {6} = @{6} WHERE {5} = @{5}",
            TABLE_NAME, FIELD_VILLE, FIELD_RUE, FIELD_NUM, FIELD_CP, FIELD_ID,FIELD_DATE);
        
        
        public static IEnumerable<Adresse> Query()
        {
            List<Adresse> adresses = new List<Adresse>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    adresses.Add(new Adresse(reader));
                }
            }
            return adresses;
        }
        
        [HttpPost]
        public static Adresse Create(Adresse adr)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_VILLE}", adr.Ville);
                command.Parameters.AddWithValue($"@{FIELD_RUE}", adr.Rue);
                command.Parameters.AddWithValue($"@{FIELD_NUM}", adr.Num);
                command.Parameters.AddWithValue($"@{FIELD_CP}", adr.Cp);
                command.Parameters.AddWithValue($"@{FIELD_DATE}", adr.Date);

                adr.Id = (int) command.ExecuteScalar();
            }
            return adr;
        }
        
        public static Adresse Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Adresse(reader) : null;
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
        public static bool Update(Adresse adr)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_VILLE}", adr.Ville);
                command.Parameters.AddWithValue($"@{FIELD_RUE}", adr.Rue);
                command.Parameters.AddWithValue($"@{FIELD_NUM}", adr.Num);
                command.Parameters.AddWithValue($"@{FIELD_CP}", adr.Cp);
                command.Parameters.AddWithValue($"@{FIELD_ID}", adr.Id);
                command.Parameters.AddWithValue($"@{FIELD_DATE}", adr.Date);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}