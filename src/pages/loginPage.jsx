import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import { Auth } from '../services/firebase';

const LoginPage = () => {
  const navigate = useNavigate();

  const { auth } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = password === '' || email === '';

  useEffect(() => {
    document.title = 'Login · Instagram';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Auth.signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setPassword('');
      setError(error.message);
    }
  };

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='hidden lg:flex lg:w-2/4'>
        <img
          src='/images/iphone-with-profile.jpg'
          alt='iPhone with Instagram app'
        />
      </div>
      <div className='mx-auto flex flex-col sm:w-3/5 md:w-2/5'>
        <div className='flex flex-col items-center mb-4 p-4 md:bg-white md:border md:border-gray-primary rounded'>
          <h1 className='flex justify-center w-full'>
            <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 w-6/12 mb-4'
            />
          </h1>

          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleLogin} method='POST'>
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Email address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              aria-label='Enter your password'
              type='password'
              placeholder='Password'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-medium text-white w-full rounded h-12 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Login
            </button>
          </form>
        </div>

        <div className='flex justify-center items-center flex-col w-full p-4 md:bg-white md:border md:border-gray-primary rounded'>
          <p className='text-sm'>
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
