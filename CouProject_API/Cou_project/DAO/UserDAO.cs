using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Cou_project.Helpers;
using Cou_project.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.DAO
{
    public class UserDAO
    {
        public static readonly string TABLE_NAME = "Utilisateur";
        public static readonly string FIELD_ID = "id";
        public static readonly string FIELD_NAME = "nom";
        public static readonly string FIELD_SURNAME = "prenom";
        public static readonly string FIELD_PSEUDO = "pseudo";
        public static readonly string FIELD_TYPE = "type";
        public static readonly string FIELD_EMAIL = "email";
        public static readonly string FIELD_HASHPWD = "hashpwd";
        public static readonly string FIELD_IDADR = "idadr";
        
        //Field concernant les favoris -> Requête ici car favoris très lié à un utilisateur
        public static readonly string TABLE_FAVORIS = "Favoris";
        public static readonly string FIELD_IDUSER = "idutil";
        public static readonly string FIELD_IDPLACE = "idlieu";
        
        //J'ai fais toutes les requêtes, quitte à en supp quelques une qui ne nous seront pas utiles, à voir plus tard ! 
        //UTILISATEUR
        private static readonly string REQ_QUERY = $"SELECT * FROM {TABLE_NAME}";
        private static readonly string RED_POST = String.Format(
            "INSERT INTO {0}({1}, {2}, {3}, {4}, {5}, {6}, {7}) OUTPUT Inserted.{8} VALUES (@{1}, @{2}, @{3}, @{4}, @{5}, @{6}, @{7})",
            TABLE_NAME, FIELD_NAME, FIELD_SURNAME, FIELD_PSEUDO, FIELD_TYPE, FIELD_EMAIL, FIELD_HASHPWD, FIELD_IDADR, FIELD_ID);
        private static readonly string REQ_GET = REQ_QUERY + $" Where {FIELD_ID} = @{FIELD_ID}";
        private static readonly string REQ_DELETE = $"DELETE FROM {TABLE_NAME} WHERE {FIELD_ID} = @{FIELD_ID}";
        //Je laisse que le nom et prénom, à voir si on laisse la possibilité de modif ces données personnel
        private static readonly string REQ_UPDATE = String.Format("UPDATE {0} SET {1} = @{1}, {2} = @{2} WHERE {3} = @{3}",
            TABLE_NAME, FIELD_NAME, FIELD_SURNAME, FIELD_ID);

        //AUTHENTIFICATION
        private static readonly string REQ_POST_AUTH =
            $"SELECT * FROM {TABLE_NAME} WHERE {FIELD_PSEUDO} = @{FIELD_PSEUDO} AND {FIELD_HASHPWD} = @{FIELD_HASHPWD}";
        
        //FAVORIS
        private static readonly string REQ_QUERY_FAVORIS = $"SELECT * FROM {TABLE_FAVORIS}";
        //Pas de String.format() sinon Exception vue qu'il n'y a que du int a insérer
        private static readonly string RED_POST_FAVORIS = $"INSERT INTO {TABLE_FAVORIS}({FIELD_IDUSER}, {FIELD_IDPLACE}) VALUES (@{FIELD_IDUSER}, @{FIELD_IDPLACE})";
        private static readonly string REQ_DELETE_FAVORIS = $"DELETE FROM {TABLE_FAVORIS} WHERE {FIELD_IDUSER} = @{FIELD_IDUSER} AND {FIELD_IDPLACE} = @{FIELD_IDPLACE}";

        static PasswordHasher hasher = new PasswordHasher();
        
        public static User QueryAuth(AuthenticateModel model)
        {
            using (var connection = DataBase.GetConnection())
            {
                //string password = hasher.HashPassword(model.Password);
                string password = Crypto.Encrypt(model.Password);

                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_POST_AUTH;

                command.Parameters.AddWithValue($"@{FIELD_PSEUDO}", model.Username);
                command.Parameters.AddWithValue($"@{FIELD_HASHPWD}", password);
                
                SqlDataReader reader = command.ExecuteReader();

                if (reader.Read())
                    return new User(reader);
                else
                    return null;
            }
        }
        
        
        public static IEnumerable<User> Query()
        {
            List<User> users = new List<User>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    users.Add(new User(reader));
                }
            }
            return users;
        }
        
        //Attention l'IDADR doit se trouver dans la table pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static User Create(User util)
        {
            
            //string password = hasher.HashPassword(util.Hashpwd);
            string password = Crypto.Encrypt(util.Hashpwd);
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST;

                command.Parameters.AddWithValue($"@{FIELD_NAME}", util.Name);
                command.Parameters.AddWithValue($"@{FIELD_SURNAME}", util.Surname);
                command.Parameters.AddWithValue($"@{FIELD_PSEUDO}", util.Pseudo);
                command.Parameters.AddWithValue($"@{FIELD_TYPE}", util.Type);
                command.Parameters.AddWithValue($"@{FIELD_EMAIL}", util.Email);
                command.Parameters.AddWithValue($"@{FIELD_HASHPWD}", password);
                command.Parameters.AddWithValue($"@{FIELD_IDADR}", util.Idadr);

                util.Id = (int) command.ExecuteScalar();
            }
            return util;
        }
        
        public static User Get(int id)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_GET;

                command.Parameters.AddWithValue($"@{FIELD_ID}", id);

                SqlDataReader reader = command.ExecuteReader();

                return reader.Read() ? new User(reader) : null;
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
        public static bool Update(User user)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_UPDATE;

                command.Parameters.AddWithValue($"@{FIELD_NAME}", user.Name);
                command.Parameters.AddWithValue($"@{FIELD_SURNAME}", user.Surname);
                command.Parameters.AddWithValue($"@{FIELD_ID}", user.Id);

                return command.ExecuteNonQuery() == 1;
            }
        }
        
        //FAVORIS
        
        public static IEnumerable<Favorites> QueryFavoris()
        {
            List<Favorites> listFavoris= new List<Favorites>();
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_QUERY_FAVORIS;
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    listFavoris.Add(new Favorites(reader));
                }
            }
            return listFavoris;
        }
        
        //Attention l'IDUTIL + IDLIEU doit se trouver dans la table pour que ca fonctionne ! a gérer au moment des connexions ;)
        [HttpPost]
        public static Favorites CreateFavoris(Favorites favorites)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = RED_POST_FAVORIS;

                command.Parameters.AddWithValue($"@{FIELD_IDUSER}", favorites.IdUser);
                command.Parameters.AddWithValue($"@{FIELD_IDPLACE}", favorites.IdPlace);

                command.ExecuteScalar();
            }
            return favorites;
        }
        public static bool DeleteFavoris(Favorites favorites)
        {
            using (var connection = DataBase.GetConnection())
            {
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandText = REQ_DELETE_FAVORIS;

                command.Parameters.AddWithValue($"@{FIELD_IDUSER}", favorites.IdUser);
                command.Parameters.AddWithValue($"@{FIELD_IDPLACE}", favorites.IdPlace);

                return command.ExecuteNonQuery() == 1;
            }
        }
    }
}