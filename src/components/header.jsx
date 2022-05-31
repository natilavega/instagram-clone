import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';
import { Auth, getUserById } from '../services/firebase';

const Header = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const { auth } = useContext(FirebaseContext);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((result) => setUsername(result.username));
    }
  }, [user]);

  return (
    <header className='h-14 bg-white border-b border-gray-primary mb-6'>
      <div className='container mx-auto px-2 max-w-screen-md h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD} aria-label='Instagram logo'>
                <img
                  src='/images/logo.png'
                  alt='Instagram'
                  className='mt-2 w-6/12'
                />
              </Link>
            </h1>
          </div>
          <div className='text-gray-700 text-center flex items-center align-items'>
            {user ? (
              <>
                <button
                  type='button'
                  title='Sign Out'
                  onClick={() => {
                    Auth.signOut(auth);
                    navigate(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      Auth.signOut(auth);
                      navigate(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className='w-6 mr-3 text-black-light cursor-pointer'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>
                </button>
                {user && (
                  <div className='flex items-center cursor-pointer'>
                    <Link to={`/p/${username}`}>
                      <img
                        className='rounded-full h-6 w-6 flex'
                        src={`/images/avatars/${username}.jpg`}
                        alt={`${username} profile`}
                        onError={(e) => {
                          e.target.src = '/images/avatars/default.png';
                        }}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type='button'
                    className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type='button'
                    className='font-bold text-sm rounded text-blue-medium w-20 h-8'
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
