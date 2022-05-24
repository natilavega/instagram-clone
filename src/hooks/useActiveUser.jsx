import { useState, useEffect } from 'react';
import { getAuthUser } from '../services/firebase';

const useActiveUser = (userId) => {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    getActiveUser();
  }, [userId]);

  const getActiveUser = async () => {
    await getAuthUser(userId).then((user) => setActiveUser(user));
  };

  return { user: activeUser };
};

export default useActiveUser;
