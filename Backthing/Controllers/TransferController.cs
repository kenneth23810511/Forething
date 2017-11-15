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
        // GET api/values/5
        [HttpGet]
        public JsonResult Get(string ServiceCode,
                string CurrentUserId, string CurrentToken, string CurrentSendParameter)
        {
            return ServiceEngine.InvokeMethod(ServiceCode, CurrentUserId, CurrentToken, CurrentSendParameter);
        }

        // GET api/values/5
        [HttpGet("{content}")]
        public JsonResult Pull([FromBody]InEntity content)
        {
            return ServiceEngine.InvokeMethod(content.ServiceCode, content.CurrentUserId, content.AccessToken, content.CurrentSendParameter);
        }

        // POST api/values
        [HttpPost]
        public JsonResult Push([FromBody]InEntity content)
        {
            return ServiceEngine.InvokeMethod(content.ServiceCode, content.CurrentUserId, content.AccessToken, content.CurrentSendParameter);
        }
    }
}
