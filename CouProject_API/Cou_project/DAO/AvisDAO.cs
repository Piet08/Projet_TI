using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class AvisDAO
    {
        public static readonly string TABLE_NAME = "Avis";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_NOTE = "note";
        public static readonly string FIELD_COMMENTAIRE = "commentaire";
        public static readonly string FIELD_VALIDER = "valider";
        public static readonly string FIELD_IDUTIL = "idutil";
        public static readonly string FIELD_IDLIEU = "idlieu";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 
        
        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";

        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}, {5}) OUTPUT Inserted.{6} VALUES (@{1}, @{2}, @{3}, @{4}, @{5})",
            TABLE_NAME, FIELD_NOTE, FIELD_COMMENTAIRE, FIELD_VALIDER, FIELD_IDUTIL, FIELD_IDLIEU, FIELD_ID);

        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_UPDATE = String.Format(
            "UPDATE {0} SET {1} = @{1}, {2} = @{2}, {3} = @{3}, {4} = @{4} WHERE {5} = @{5}",
            TABLE_NAME, FIELD_NOTE, FIELD_COMMENTAIRE, FIELD_IDUTIL, FIELD_IDLIEU, FIELD_ID);

        public static IEnumerable<Avis> Query()
        {
            List<Avis> listAvis = new List<Avis>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    listAvis.Add(new Avis(reader));
                }
            }
            return listAvis;
        }
        //Attention l'IDUTIL + IDLIEU doit se trouver dans la BD pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Avis Create(Avis avis)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_NOTE}", avis.Note);
                command.Parameters.AddWithValue($"@{FIELD_COMMENTAIRE}", avis.Commentaire);
                command.Parameters.AddWithValue($"@{FIELD_VALIDER}", avis.Valider);
                command.Parameters.AddWithValue($"@{FIELD_IDUTIL}", avis.Idutil);
                command.Parameters.AddWithValue($"@{FIELD_IDLIEU}", avis.Idlieu);

                avis.Id = (int) command.ExecuteScalar();
            }
            return avis;
        }
        
        public static Avis Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Avis(reader) : null;
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
        public static bool Update(Avis avis)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_NOTE}", avis.Note);
                command.Parameters.AddWithValue($"@{FIELD_COMMENTAIRE}", avis.Commentaire);
                command.Parameters.AddWithValue($"@{FIELD_VALIDER}", avis.Valider);
                command.Parameters.AddWithValue($"@{FIELD_IDUTIL}", avis.Idutil);
                command.Parameters.AddWithValue($"@{FIELD_IDLIEU}", avis.Idlieu);
                command.Parameters.AddWithValue($"@{FIELD_ID}", avis.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}