using System;
using System.Collections.Generic;
using System.Text;

namespace CoreCommon
{
    public sealed class HostEntry
    {
        public static Dictionary<string, ServiceEntity> ServiceCodes = new Dictionary<string, ServiceEntity>();

        private static HostEntry uniqueInstance;

        private HostEntry()
        {
        }

        public static HostEntry GetInstance()
        {
            if (uniqueInstance == null)
            {
                uniqueInstance = new HostEntry();
            }
            return uniqueInstance;
        }

        public void Startup()
        {
            ServiceCodes["000001"] = new ServiceEntity() { ServiceCode = "000001", AssemblyName = "CoreBusiness", ClassType = "CoreBusiness.Product", MethodName = "LoadProducts" };
            ServiceCodes["000002"] = new ServiceEntity() { ServiceCode = "000002", AssemblyName = "CoreBusiness", ClassType = "CoreBusiness.Product", MethodName = "PushTest" };

        }

        public ServiceEntity QueryService(string serviceCode)
        {
            if (!string.IsNullOrEmpty(serviceCode) && ServiceCodes.ContainsKey(serviceCode))
            {
                return ServiceCodes[serviceCode];
            }

            return new ServiceEntity() { ServiceCode = "000000", AssemblyName = "", ClassType = "", MethodName = "" };
        }
    }
}
