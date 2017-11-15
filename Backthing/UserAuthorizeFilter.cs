using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;

namespace Backthing
{
    public class UserAuthorizeFilter : AuthorizeFilter
    {
        public UserAuthorizeFilter(AuthorizationPolicy policy) : base(policy)
        {
        }
        public override Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {           
            StringValues values;
            if (context.HttpContext.Request.Headers.TryGetValue("AccessToken", out values))
            {
                var token = values.First();
                if (token == "token") // todo
                {
                    return Task.FromResult(0);
                }
            }

            return base.OnAuthorizationAsync(context); //Verify failed
        }  
    }
}
