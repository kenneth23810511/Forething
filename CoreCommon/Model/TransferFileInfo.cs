using System;
using System.Reflection;
using System.ComponentModel;
using System.Collections.ObjectModel;

namespace CoreCommon
{
    public class TransferFileInfo
    {
        public string currentUserId { get; set; }
        public string currentSendParameter { get; set; }
        public string FolderName
        {
            get;
            set;
        }

        public string FileType
        {
            get;
            set;
        }

        public string FileName
        {
            get;
            set;
        }

        public int FilePosition
        {
            get;
            set;
        }

        public int FileBufferLength
        {
            get;
            set;
        }

        public long FileLength
        {
            get;
            set;
        }

        public int FilePrivatePart
        {
            get;
            set;
        }

        public string Reference
        {
            get;
            set;
        }
    }
}