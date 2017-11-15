using CoreCommon;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Text;

namespace CoreBusiness
{
    public partial class Product
    {
        public static JsonResult LoadProducts(string currentUserId, string acessToken, string currentSendParameter)
        {
            var list = new List<dynamic>();
            dynamic person1 = new ExpandoObject();
            person1.Icon = "http://172.16.23.60:8005/test/product4.png";
            person1.LocalIcon = "";
            person1.FirstName = "Ellen1";
            person1.LastName = "Adams1";
            list.Add(person1);

            dynamic person2 = new ExpandoObject();
            person2.Icon = "http://172.16.23.60:8006/api/stream/product4.png";
            person2.LocalIcon = "";
            person2.FirstName = "Ellen2";
            person2.LastName = "Adams2";
            list.Add(person2);

            dynamic person3 = new ExpandoObject();
            person3.Icon = "http://172.16.23.60:8006/api/stream/product4.png";
            person3.LocalIcon = "";
            person3.FirstName = "Ellen3";
            person3.LastName = "Adams3";
            list.Add(person3);

            OutEntity oe = new OutEntity();
            oe.ErrorCode = ErrorCode.Success;
            oe.ReturnObj = list;
            
            return new JsonResult(oe);
        }

        public static JsonResult PushTest(string currentUserId, string acessToken, string currentSendParameter)
        {            
            Byte[] bytes = Convert.FromBase64String(currentSendParameter);
            string imagepath = string.Format(@"{0}\Resource\Test\{1}.jpg", Directory.GetCurrentDirectory(), Guid.NewGuid().ToString());
            using (FileStream fs = new FileStream(imagepath, FileMode.OpenOrCreate, FileAccess.ReadWrite))
            {
                fs.Write(bytes, 0, bytes.Length);
                fs.Flush();
            }
            OutEntity oe = new OutEntity();
            oe.ErrorCode = ErrorCode.Success;
            oe.ReturnObj = "Works";
            return new JsonResult(oe);
        }
    }
}
