import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist, createUser } from '../services/firebase';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = password === '' || email === '';

  useEffect(() => {
    document.title = 'Sign Up · Instagram';
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        await createUser(email, password, username, fullName);
        navigate(ROUTES.DASHBOARD);
      } catch {
        setPassword('');
        setError(error.message);
      }
    } else {
      setPassword('');
      setError('Username is already taken, please try another.');
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

          <form onSubmit={handleSignUp} method='POST'>
            <input
              aria-label='Enter your username'
              type='text'
              placeholder='Username'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label='Enter your full name'
              type='text'
              placeholder='Full Name'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
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
              Sign Up
            </button>
          </form>
        </div>

        <div className='flex justify-center items-center flex-col w-full p-4 md:bg-white md:border md:border-gray-primary rounded'>
          <p className='text-sm'>
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
