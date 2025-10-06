import React from 'react';

function ProgressBar({ progress = 0 }) {
  return (
    <div className='bg-gray-300 w-full h-4 mt-3 rounded-full overflow-hidden'>
      <div
        className='bg-blue-500 h-full rounded-full text-[10px] text-white flex items-center justify-center transition-all duration-500 ease-in-out'
        style={{ width: `${progress}%` }}
      >
        {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  );
}

export default ProgressBar;
