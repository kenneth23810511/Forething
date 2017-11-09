using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using System.IO;
using CoreCommon;

namespace Backthing.Controllers
{
    [Route("api/[controller]")]
    public class TransferController : Controller
    {
        // GET api/values
        [HttpGet]
        public string Get()
        {
            return "Welcome onboard!";
        }

        // GET api/values/5
        [HttpGet("{content}")]
        public JsonResult Pull([FromBody]InEntity content)
        {
            return ServiceEngine.InvokeMethod(content.AssemblyName, content.ClassType, content.MethodName,
                content.CurrentUserId, content.CurrentClientId, content.CurrentSendParameter);
        }

        // POST api/values
        [HttpPost]
        public JsonResult Push([FromBody]InEntity content)
        {
            return ServiceEngine.InvokeMethod(content.AssemblyName, content.ClassType, content.MethodName,
                content.CurrentUserId, content.CurrentClientId, content.CurrentSendParameter);
        }
    }
}
