using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class LieuDAO
    {
        public static readonly string TABLE_NAME = "Lieu";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_NOM = "nom";
        public static readonly string FIELD_TYPE = "type";
        public static readonly string FIELD_DESCRIPTION = "description";
        public static readonly string FIELD_IDADR = "idadr";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 

        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";

        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}) OUTPUT Inserted.{5} VALUES (@{1}, @{2}, @{3}, @{4})",
            TABLE_NAME, FIELD_NOM, FIELD_TYPE, FIELD_DESCRIPTION, FIELD_IDADR, FIELD_ID);

        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_UPDATE = String.Format(
            "UPDATE {0} SET {1} = @{1}, {2} = @{2}, {3} = @{3}, {4} = @{4} WHERE {5} = @{5}",
            TABLE_NAME, FIELD_NOM, FIELD_TYPE, FIELD_DESCRIPTION, FIELD_IDADR, FIELD_ID);


        public static IEnumerable<Lieu> Query()
        {
            List<Lieu> lieux = new List<Lieu>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    lieux.Add(new Lieu(reader));
                }
            }
            return lieux;
        }
        //Attention l'IDADR doit se trouver dans la BD pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Lieu Create(Lieu lieu)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_NOM}", lieu.Nom);
                command.Parameters.AddWithValue($"@{FIELD_TYPE}", lieu.Type);
                command.Parameters.AddWithValue($"@{FIELD_DESCRIPTION}", lieu.Description);
                command.Parameters.AddWithValue($"@{FIELD_IDADR}", lieu.Idadr);

                lieu.Id = (int) command.ExecuteScalar();
            }
            return lieu;
        }
        public static Lieu Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Lieu(reader) : null;
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
        public static bool Update(Lieu lieu)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_NOM}", lieu.Nom);
                command.Parameters.AddWithValue($"@{FIELD_TYPE}", lieu.Type);
                command.Parameters.AddWithValue($"@{FIELD_DESCRIPTION}", lieu.Description);
                command.Parameters.AddWithValue($"@{FIELD_IDADR}", lieu.Idadr);
                command.Parameters.AddWithValue($"@{FIELD_ID}", lieu.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}