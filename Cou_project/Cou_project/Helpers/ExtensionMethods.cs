
using System.Collections.Generic;
using System.Linq;
using Cou_project.Models;

namespace Cou_project.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Utilisateur> WithoutPasswords(this IEnumerable<Utilisateur> users) {
            return users.Select(x => x.WithoutPassword());
        }

        public static Utilisateur WithoutPassword(this Utilisateur user) {
            user.Hashpwd = null;
            return user;
        }
    }
}