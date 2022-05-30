import { useState, useEffect } from 'react';
import { getUserById } from '../services/firebase';

const useLoggedInUser = (userId) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    getLoggedInUser();
  }, [userId]);

  const getLoggedInUser = async () => {
    await getUserById(userId).then((user) => setLoggedInUser(user));
  };

  return { user: loggedInUser };
};

export default useLoggedInUser;
