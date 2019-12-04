using System.Data.SqlClient;

namespace Cou_project.Models
{
    public static class DataBase
    {
        //MODIFIER POUR SON SERVEUR --> "@" pour le "\" qui se trouve dans le nom !!
        public static readonly string SERVER_FIXE_PIERRE = @"LAPTOP-FRN65M2S\MSSQLSERVER01";

        //private static readonly string CONNECTION_STRING = $"Server={SERVER};Database=cou_project;Integrated Security=SSPI;";
        public static readonly string SERVER_PIERRE = "DESKTOP-N27P2MS";
        public static readonly string SERVER_FRANCOIS = "VROOOOOOOOM";
        public static readonly string SERVER_ELIOT = "DESKTOP-DJGE66N";

        public static readonly string SERVER = "cou-project.database.windows.net";

        public static readonly string CONNECTION_AZURE = @"Server=cou-project.database.windows.net;Database=cou_project;User Id=loginAdmin;Password=mdpCOU_project;Trusted_Connection=False;MultipleActiveResultSets=true;";

        private static readonly string CONNECTION_STRING = $"Server={SERVER_FRANCOIS};Database=cou_project;Integrated Security=SSPI;";

        public static SqlConnection GetConnection()
        {
            return new SqlConnection(CONNECTION_AZURE);
        }
    }
}
