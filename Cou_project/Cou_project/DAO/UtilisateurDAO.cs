using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class UtilisateurDAO
    {
        public static readonly string TABLE_NAME = "Utilisateur";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_NOM = "nom";
        public static readonly string FIELD_PRENOM = "prenom";
        public static readonly string FIELD_PSEUDO = "pseudo";
        public static readonly string FIELD_TYPE = "type";
        public static readonly string FIELD_EMAIL = "email";
        public static readonly string FIELD_HASHPWD = "hashpwd";
        public static readonly string FIELD_IDADR = "idadr";
        
        //Field concernant les favoris -> Requête ici car favoris très lié à un utilisateur
        public static readonly string TABLE_FAVORIS = "Favoris";
        public static readonly string FIELD_IDUTIL = "idutil";
        public static readonly string FIELD_IDLIEU = "idlieu";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 
        //UTILISATEUR
        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";
        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}, {5}, {6}, {7}) OUTPUT Inserted.{8} VALUES (@{1}, @{2}, @{3}, @{4}, @{5}, @{6}, @{7})",
            TABLE_NAME, FIELD_NOM, FIELD_PRENOM, FIELD_PSEUDO, FIELD_TYPE, FIELD_EMAIL, FIELD_HASHPWD, FIELD_IDADR, FIELD_ID);
        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";
        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";
        //Je laisse que le nom et prénom, à voir si on laisse la possibilité de modif ces données personnel
        private static readonly string REQ_UPDATE = String.Format("UPDATE {0} SET {1} = @{1}, {2} = @{2} WHERE {3} = @{3}",
            TABLE_NAME, FIELD_NOM, FIELD_PRENOM, FIELD_ID);

        //FAVORIS
        private static readonly string REQ_QUERY_FAVORIS = $"SELECT * FROM {TABLE_FAVORIS}";
        //Pas de String.format() sinon Exception vue qu'il n'y a que du int a insérer
        private static readonly string RED_POST_FAVORIS = $"INSERT INTO {TABLE_FAVORIS}({FIELD_IDUTIL}, {FIELD_IDLIEU}) VALUES (@{FIELD_IDUTIL}, @{FIELD_IDLIEU})";
        private static readonly string REQ_DELETE_FAVORIS = $"DELETE FROM {TABLE_FAVORIS} WHERE {FIELD_IDUTIL} = @{FIELD_IDUTIL} AND {FIELD_IDLIEU} = @{FIELD_IDLIEU}";

        public static IEnumerable<Utilisateur> Query()
        {
            List<Utilisateur> utilisateurs = new List<Utilisateur>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    utilisateurs.Add(new Utilisateur(reader));
                }
            }
            return utilisateurs;
        }
        
        //Attention l'IDADR doit se trouver dans la table pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Utilisateur Create(Utilisateur util)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_NOM}", util.Nom);
                command.Parameters.AddWithValue($"@{FIELD_PRENOM}", util.Prenom);
                command.Parameters.AddWithValue($"@{FIELD_PSEUDO}", util.Pseudo);
                command.Parameters.AddWithValue($"@{FIELD_TYPE}", util.Type);
                command.Parameters.AddWithValue($"@{FIELD_EMAIL}", util.Email);
                command.Parameters.AddWithValue($"@{FIELD_HASHPWD}", util.Hashpwd);
                command.Parameters.AddWithValue($"@{FIELD_IDADR}", util.Idadr);

                util.Id = (int) command.ExecuteScalar();
            }
            return util;
        }
        
        public static Utilisateur Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new Utilisateur(reader) : null;
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
        public static bool Update(Utilisateur utilisateur)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_NOM}", utilisateur.Nom);
                command.Parameters.AddWithValue($"@{FIELD_PRENOM}", utilisateur.Prenom);
                command.Parameters.AddWithValue($"@{FIELD_ID}", utilisateur.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
        
        //FAVORIS
        
        public static IEnumerable<Favoris> QueryFavoris()
        {
            List<Favoris> listFavoris= new List<Favoris>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY_FAVORIS;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    listFavoris.Add(new Favoris(reader));
                }
            }
            return listFavoris;
        }
        
        //Attention l'IDUTIL + IDLIEU doit se trouver dans la table pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Favoris CreateFavoris(Favoris favoris)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST_FAVORIS;

                command.Parameters.AddWithValue($"@{FIELD_IDUTIL}", favoris.Idutil);
                command.Parameters.AddWithValue($"@{FIELD_IDLIEU}", favoris.Idlieu);

                command.ExecuteScalar();
            }
            return favoris;
        }
        public static bool DeleteFavoris(Favoris favoris)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_DELETE_FAVORIS;

                command.Parameters.AddWithValue($"@{FIELD_IDUTIL}", favoris.Idutil);
                command.Parameters.AddWithValue($"@{FIELD_IDLIEU}", favoris.Idlieu);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}