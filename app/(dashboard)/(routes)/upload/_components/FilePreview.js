import { X, FileText, FileImage, FileAudio, FileVideo, FileArchive, FileCode, File } from 'lucide-react';
import React from 'react';

function FilePreview({ file, removeFile }) {
  const Icon = getFileIcon(file?.type);

  return (
    <div className='flex items-center gap-4 justify-between mt-5 border rounded-md p-2 border-blue-200'>
      <div className='p-2 bg-blue-100 rounded-md'>
        <Icon size={48} className='text-blue-500' />
      </div>

      <div className='flex-1 text-left'>
        <h2 className='font-semibold'>{file.name}</h2>
        <h2 className='text-[12px] text-gray-400'>
          {file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB
        </h2>
      </div>

      <X className='text-red-500 cursor-pointer' onClick={removeFile} />
    </div>
  );
}

export default FilePreview;

// Place this below or above your component
const getFileIcon = (type) => {
  if (!type) return File;

  if (type.startsWith('image/')) return FileImage;
  if (type.startsWith('audio/')) return FileAudio;
  if (type.startsWith('video/')) return FileVideo;
  if (type.includes('pdf')) return FileText;
  if (type.includes('zip') || type.includes('rar')) return FileArchive;
  if (type.includes('json') || type.includes('javascript') || type.includes('text') || type.includes('html')) return FileCode;

  return File;
};
