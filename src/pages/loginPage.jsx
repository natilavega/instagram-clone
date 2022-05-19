import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  const handleLogin = () => {};

  return (
    <div className='container flex mx-auto max-w-screen-md items-center'>
      I've no idea!
    </div>
  );
};

export default LoginPage;
