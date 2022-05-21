import React, { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Not Found · Instagram';
  }, []);

  return (
    <div className='bg-gray-background'>
      <div className='mx-auto max-w-screen-lg'>
        <p className='text-center text-2xl'>Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
