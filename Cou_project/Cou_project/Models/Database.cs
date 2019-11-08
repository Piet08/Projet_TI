﻿using System.Data.SqlClient;

namespace Cou_project.Models
{
    public static class DataBase
    {
        //MODIFIER POUR SON SERVEUR --> "@" pour le "\" qui se trouve dans le nom !!
        public static readonly string SERVER = @"LAPTOP-FRN65M2S\MSSQLSERVER01";
        
        private static readonly string CONNECTION_STRING = $"Server={SERVER};Database=cou_project;Integrated Security=SSPI;";

        public static SqlConnection GetConnection()
        {
            return new SqlConnection(CONNECTION_STRING);
        }
    }
}