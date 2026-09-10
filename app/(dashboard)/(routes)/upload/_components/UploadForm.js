import React, { useState } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';
import SuccessAlert from './SuccessAlert';
import { isBlockedFile, MAX_FILE_SIZE } from './../../../../_utils/security';

function UploadForm({ uploadBtnClick }) {
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onFileSelect = (file) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setErrorMsg('Maximum File Upload size is 100MB');
      return;
    }
    if (file && isBlockedFile(file.name)) {
      setErrorMsg('This file type is blocked for security reasons');
      return;
    }
    setErrorMsg(null);
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setProgress(40); // fake progress to show movement

    try {
      await uploadBtnClick(file);
    } finally {
      setProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
        setFile(null); // Optional: reset file after upload
      }, 1000);
    }
  };

  return (
    <div className='text-center'>
      <div className='flex items-center justify-center w-full'>
        <label
          htmlFor='dropzone-file'
          className='flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100'
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <svg
              className='w-12 h-12 mb-4 text-blue-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <p className='mb-2 text-lg md:text-2xl text-gray-500'>
              <span className='font-semibold'>Click to upload</span> or{' '}
              <strong className='text-blue-500'>drag</strong> and{' '}
              <strong className='text-blue-500'>drop</strong>
            </p>
            <p className='text-xs text-gray-500'>
              UPLOAD ANY TYPE OF FILE (MAX. SIZE 100MB)
            </p>
          </div>
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            onChange={(e) => onFileSelect(e.target.files[0])}
          />
        </label>
      </div>

      {errorMsg && <AlertMsg msg={errorMsg} />}
      {file && <FilePreview file={file} removeFile={() => setFile(null)} />}

      {isUploading ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className='p-2 bg-blue-500 text-white w-[30%] rounded-full mt-5 disabled:bg-gray-500'
          onClick={handleUpload}
        >
          Upload
        </button>
      )}

    </div>
  );
}

export default UploadForm;
