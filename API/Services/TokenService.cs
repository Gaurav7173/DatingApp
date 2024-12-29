using System;

using API.Entities;
namespace API;

using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

public class TokenService(IConfiguration config): ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenkey=config["TokenKey"] ?? throw new Exception("Cannot access tokenkey from appsettings");
        if(tokenkey.Length<64) throw new Exception("Your tokenkey needs to be longer");
        var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));
        
        var claims=new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.UserName)
        };

        var creds=new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokendescriptor=new SecurityTokenDescriptor
        {
            Subject=new ClaimsIdentity(claims),
            Expires=DateTime.Now.AddDays(7),
            SigningCredentials=creds
        };
        var tokenhandler=new JwtSecurityTokenHandler();
        var token=tokenhandler.CreateToken(tokendescriptor);
        return tokenhandler.WriteToken(token);
    }
    

}
