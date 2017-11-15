using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net;
using Microsoft.AspNetCore.Hosting.Internal;
using System.IO;
using CoreCommon;

namespace Backthing.Controllers
{
    [Route("api/Stream")]
    public class StreamController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), @"\Resource\Test\Product.png");
        }

        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            string filePath = string.Format("{0}{1}{2}", Directory.GetCurrentDirectory(), @"\Resource\Test\", id);
            var fileArray = System.IO.File.ReadAllBytes(filePath);            
            HttpContext.Response.Headers.Add("Content-Length", fileArray.Length.ToString());
            HttpContext.Response.Headers.Add("Accept-Ranges", "bytes");
            HttpContext.Response.Headers.Add("Server", "Microsoft-IIS/10.0");
            HttpContext.Response.Headers.Add("ETag", new Random((int)DateTime.Now.Ticks).Next(99999999).ToString());
            HttpContext.Response.Headers.Add("Last-Modified", DateTime.Now.ToString());
            return File(fileArray, "image/png");
        }

        [HttpPost]
        public byte[] GetBinaryFile([FromBody]TransferFileInfo fileInfo)
        {
            return ServiceEngine.GetBinaryFile(fileInfo);
        }

        [HttpPost]
        public TransferFileInfo PushBinaryFileInfo([FromBody]TransferFileInfo fileInfo, byte[] binary)
        {
            return ServiceEngine.PushBinaryFileInfo(fileInfo, binary);
        }
    }
}