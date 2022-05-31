import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page Not Found · Instagram';
  }, []);

  return (
    <div className='bg-gray-background'>
      <div className='mx-auto p-12 md:px-6 md:max-w-screen-md'>
        <p className='text-center text-xl md:text-2xl font-semibold mb-4'>
          Sorry, this page isn't available.
        </p>
        <p className='text-center'>
          The link you followed may be broken, or the page may have been
          removed.
          <Link to={ROUTES.DASHBOARD}>
            {' '}
            <span className='cursor-pointer'>Go back to Instagram.</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
