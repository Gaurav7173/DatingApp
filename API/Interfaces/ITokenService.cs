using System;

namespace API.Interfaces;
using API.Entities;
using API.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}
