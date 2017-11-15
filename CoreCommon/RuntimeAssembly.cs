using Microsoft.Extensions.DependencyModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;

namespace CoreCommon
{
    public class RuntimeAssembly
    {
        public static List<Assembly> RuntimeAssemblies = new List<Assembly>();
        public static IList<Assembly> GetAllAssemblies()
        {
            if (RuntimeAssemblies == null || RuntimeAssemblies.Count == 0)
            {
                var deps = DependencyContext.Default;
                var libs = deps.CompileLibraries.Where(lib => !lib.Serviceable && lib.Type != "package");
                foreach (var lib in libs)
                {
                    try
                    {
                        var assembly = AssemblyLoadContext.Default.LoadFromAssemblyName(new AssemblyName(lib.Name));
                        if (!RuntimeAssemblies.Any(a => a.FullName.Contains(assembly.FullName)))
                        {
                            RuntimeAssemblies.Add(assembly);
                        }
                    }
                    catch (Exception)
                    {
                        // ignored
                    }
                }
            }
            return RuntimeAssemblies;
        }

        public static Assembly GetAssembly(string assemblyName)
        {
            return GetAllAssemblies().FirstOrDefault(assembly => assembly.FullName.Contains(assemblyName));
        }

        public static void PushAssembly(Assembly assembly)
        {
            if (!RuntimeAssemblies.Any(a => a.FullName.Contains(assembly.FullName)))
            {
                RuntimeAssemblies.Add(assembly);
            }
        }

        public static IList<Type> GetAllTypes()
        {
            var list = new List<Type>();
            foreach (var assembly in GetAllAssemblies())
            {
                var typeInfos = assembly.DefinedTypes;
                foreach (var typeInfo in typeInfos)
                {
                    list.Add(typeInfo.AsType());
                }
            }
            return list;
        }

        public static IList<Type> GetTypesByAssembly(string assemblyName)
        {
            var list = new List<Type>();
            var assembly = AssemblyLoadContext.Default.LoadFromAssemblyName(new AssemblyName(assemblyName));
            var typeInfos = assembly.DefinedTypes;
            foreach (var typeInfo in typeInfos)
            {
                list.Add(typeInfo.AsType());
            }
            return list;
        }

        public static Type GetImplementType(string typeName, Type baseInterfaceType)
        {
            return GetAllTypes().FirstOrDefault(t =>
            {
                if (t.Name == typeName &&
                    t.GetTypeInfo().GetInterfaces().Any(b => b.Name == baseInterfaceType.Name))
                {
                    var typeInfo = t.GetTypeInfo();
                    return typeInfo.IsClass && !typeInfo.IsAbstract && !typeInfo.IsGenericType;
                }
                return false;
            });
        }
    }
}
