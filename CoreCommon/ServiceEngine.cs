using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Loader;
using System.IO;

namespace CoreCommon
{
    public sealed class ServiceEngine
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="errorCode"></param>
        /// <returns></returns>
        private static JsonResult DealErrorInfo(string errorCode, string errorMessage = null)
        {
            OutEntity oe = new OutEntity() { ErrorCode = errorCode, ErrorMessage = errorMessage };
            return new JsonResult(oe);
        }

        private static object InvokeMethodBase(string assemblyName, string classType, string methodName, string currentUserId, string acessToken, object currentSendParameter, Type paratype)
        {
            object outEntity = null;
            //加载 Assembly
            Assembly assembly = null;
            if (assemblyName != "")
            {
                try
                {
                    assembly = RuntimeAssembly.GetAssembly(assemblyName);
                    if (assembly == null)
                    {
                        string assemblyPath = string.Format("{0}\\{1}.dll", AppContext.BaseDirectory, assemblyName);
                        assembly = AssemblyLoadContext.Default.LoadFromAssemblyPath(assemblyPath);
                        RuntimeAssembly.PushAssembly(assembly);
                    }                    
                }
                catch (Exception ep)
                {
                    return DealErrorInfo(ErrorCode.LoadAssemblyError, ep.Message);
                }
            }
            else
            {
                return DealErrorInfo(ErrorCode.LoadAssemblyConfigError);
            }

            if (assembly == null)
            {
                return DealErrorInfo(ErrorCode.LoadAssemblyConfigError);
            }

            //加载类型
            Type type = null;
            if (classType != "")
            {
                try
                {
                    type = assembly.GetType(classType);
                    if (type == null)
                    {
                        classType = string.Format("{0}.{1}", assemblyName, classType);
                        type = assembly.GetType(classType);
                    }
                }
                catch (Exception ep)
                {
                    return DealErrorInfo(ErrorCode.GetAssemblyTypeError, ep.Message);
                }
            }
            else
            {
                return DealErrorInfo(ErrorCode.GetAssemblyTypeConfigError);
            }

            if (type == null)
            {
                return DealErrorInfo(ErrorCode.GetAssemblyTypeConfigError);
            }

            //加载类型
            MethodInfo methodInfo = null;
            if (methodName != "")
            {
                try
                {
                    Type[] typeArray = new Type[3];
                    typeArray.SetValue(typeof(string), 0);
                    typeArray.SetValue(typeof(string), 1);
                    typeArray.SetValue(paratype, 2);
                    methodInfo = type.GetMethod(methodName, typeArray);
                }
                catch (Exception ep)
                {
                    return DealErrorInfo(ErrorCode.GetAssemblyMethodError, ep.Message);
                }
            }
            else
            {
                return DealErrorInfo(ErrorCode.GetAssemblyMethodConfigError);
            }

            if (methodInfo == null)
            {
                return DealErrorInfo(ErrorCode.GetAssemblyMethodConfigError);
            }

            //产生实例
            Object objectInstance = null;
            if (classType != "")
            {
                try
                {
                    objectInstance = assembly.CreateInstance(classType);
                }
                catch (Exception ep)
                {
                    return DealErrorInfo(ErrorCode.CreateInstanceError, ep.Message);
                }
            }
            else
            {
                return DealErrorInfo(ErrorCode.CreateInstanceConfigError);
            }

            if (objectInstance == null)
            {
                return DealErrorInfo(ErrorCode.CreateInstanceConfigError);
            }

            //调用方法
            try
            {
                object[] objectParameters = new object[] { currentUserId, acessToken, currentSendParameter };

                outEntity = methodInfo.Invoke(objectInstance, objectParameters);
            }
            catch (Exception ep)
            {
                return DealErrorInfo(ErrorCode.InvokeMethodError, ep.Message);
            }

            return outEntity;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="inEntity"></param>
        /// <returns></returns>
        public static JsonResult InvokeMethod(string serviceCode, string currentUserId, string acessToken, string currentSendParameter)
        {
            ServiceEntity service = HostEntry.GetInstance().QueryService(serviceCode);
            return (JsonResult)InvokeMethodBase(service.AssemblyName, service.ClassType, service.MethodName, currentUserId, acessToken, currentSendParameter, typeof(string));
        }

        public static TransferFileInfo PushBinaryFileInfo(TransferFileInfo fileInfo, byte[] binary)
        {
            string foldername = fileInfo.FolderName;
            string filename = fileInfo.FileName;
            string attachid = Path.GetFileNameWithoutExtension(filename);
            foldername = foldername.Replace("/", "\\");
            string diskPath = foldername; //todo
            if (!Directory.Exists(diskPath))
            {
                Directory.CreateDirectory(diskPath);
            }
            string filePath = diskPath + "\\" + fileInfo.FileName;
            using (FileStream fs = new FileStream(filePath, FileMode.OpenOrCreate, FileAccess.ReadWrite))
            {
                fs.Seek(fileInfo.FilePosition, SeekOrigin.Begin);
                fs.Write(binary, 0, fileInfo.FileBufferLength);
                long fslength = fs.Length;
                fs.Flush();
            }
            return fileInfo;
        }

        public static byte[] GetBinaryFile(TransferFileInfo fileInfo)
        {
            try
            {
                if (File.Exists(fileInfo.FileName))
                {
                    byte[] buffer = null;
                    using (FileStream fs = new FileStream(fileInfo.FileName, FileMode.Open, FileAccess.Read))
                    {
                        fs.Seek(fileInfo.FilePosition, SeekOrigin.Begin);
                        buffer = new byte[fileInfo.FileBufferLength];
                        fs.Read(buffer, 0, buffer.Length);
                    }
                    return buffer;
                }
            }
            catch (Exception ex)
            {

            }
            return null;
        }
    }
}
