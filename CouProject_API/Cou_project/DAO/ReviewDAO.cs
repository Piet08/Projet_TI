using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class ReviewDAO
    {
        public static readonly string TABLE_NAME = "Avis";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_STAR = "note";
        public static readonly string FIELD_COMMENT = "commentaire";
        public static readonly string FIELD_ISVALID = "valider";
        public static readonly string FIELD_IDUSER = "idutil";
        public static readonly string FIELD_IDPLACE = "idlieu";
        public static readonly string FIELD_DATE = "date";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 
        
        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";

        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}, {5}) OUTPUT Inserted.{6} VALUES (@{1}, @{2}, @{3}, @{4}, @{5})",
            TABLE_NAME, FIELD_STAR, FIELD_COMMENT, FIELD_ISVALID, FIELD_IDUSER, FIELD_IDPLACE, FIELD_ID);

        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_GET_BY_LIEU = REQ_QUERY + $" where {FIELD_IDPLACE} = @{FIELD_IDPLACE}";
            
        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";

        private static readonly string REQ_UPDATE = String.Format(
            "UPDATE {0} SET {1} = @{1}, {2} = @{2}, {3} = @{3}, {4} = @{4} WHERE {5} = @{5}",
            TABLE_NAME, FIELD_STAR, FIELD_COMMENT, FIELD_IDUSER, FIELD_IDPLACE, FIELD_ID);


        public static IEnumerable<Review> Query()
        {
            List<Review> listAvis = new List<Review>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    listAvis.Add(new Review(reader));
                }
            }
            return listAvis;
        }

        public static IEnumerable<Review> GetReviewByPlace(int id)
        {
            List<Review> listReview = new List<Review>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET_BY_LIEU;
                command.Parameters.AddWithValue($"@{FIELD_IDPLACE}", id);
                
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    listReview.Add(new Review(reader));
                }
            }
            return listReview;
        }


        //Attention l'IDUTIL + IDLIEU doit se trouver dans la BD pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Review Create(Review review)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_STAR}", review.Star);
                command.Parameters.AddWithValue($"@{FIELD_COMMENT}", review.Comment);
                command.Parameters.AddWithValue($"@{FIELD_ISVALID}", review.IsValid);
                command.Parameters.AddWithValue($"@{FIELD_IDUSER}", review.IdUser);
                command.Parameters.AddWithValue($"@{FIELD_IDPLACE}", review.IdPlace);

                review.Id = (int) command.ExecuteScalar();
            }
            return review;
        }
        
        public static Review Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Review(reader) : null;
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
        public static bool Update(Review review)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_STAR}", review.Star);
                command.Parameters.AddWithValue($"@{FIELD_COMMENT}", review.Comment);
                command.Parameters.AddWithValue($"@{FIELD_ISVALID}", review.IsValid);
                command.Parameters.AddWithValue($"@{FIELD_IDUSER}", review.IdUser);
                command.Parameters.AddWithValue($"@{FIELD_IDPLACE}", review.IdPlace);
                command.Parameters.AddWithValue($"@{FIELD_ID}", review.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}