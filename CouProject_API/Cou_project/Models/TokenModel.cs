using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Cou_project.Models
{
    public class TokenModel
    {
        public static string GetToken(HttpRequest request)
        {
            var token = request.Headers["Authorization"].First();
            return token.StartsWith("Bearer ") ? token.Substring(7) : token;
        }

        public static string ReadClaimsFromToken(string token, string claimType)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            foreach (Claim claim in jwtToken.Claims)
            {
                if (claim.Type == claimType)
                    return claim.Value;
            }

            return null;
        }

        public static string ReadClaimFromRequest(HttpRequest request, string claimType)
        {
            return ReadClaimsFromToken(GetToken(request), claimType);
        }
    }
}