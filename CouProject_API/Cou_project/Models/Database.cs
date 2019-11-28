using System.Data.SqlClient;

namespace Cou_project.Models
{
    public static class DataBase
    {
        //MODIFIER POUR SON SERVEUR --> "@" pour le "\" qui se trouve dans le nom !!
        public static readonly string SERVER_PIERRE = "DESKTOP-N27P2MS";
        public static readonly string SERVER_FRANCOIS = "DESKTOP-I1BQBCI";
        
        private static readonly string CONNECTION_STRING = $"Server={SERVER_FRANCOIS};Database=cou_project;Integrated Security=SSPI;";

        public static SqlConnection GetConnection()
        {
            return new SqlConnection(CONNECTION_STRING);
        }
    }
}