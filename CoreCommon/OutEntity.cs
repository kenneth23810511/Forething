/////////////////////////////////////////////////////////////////
// 
// (C) Copyright 2013, Kenneth, Inc.
// All rights reserved. Confidential. Except as pursuant
// to a written agreement with Kenneth, this software may
// not be used or distributed. This software may be covered
// by one or more patents.
//
// 本软件为Kenneth开发，版权所有，违者必究，320325198102218110
//
/////////////////////////////////////////////////////////////////

using System;
using System.Collections.Generic;
using System.Text;

namespace CoreCommon
{
    public class OutEntity
    {       

        /// <summary>
        /// 错误代码
        /// </summary>
        public string ErrorCode { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        public string ErrorMessage { get; set; }
        /// <summary>
        /// 需要返回的数据
        /// </summary>
        public object ReturnObj { get; set; }
    }
}
