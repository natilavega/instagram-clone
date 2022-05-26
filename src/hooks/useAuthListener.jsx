import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );
  const {
    Auth: { auth },
  } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Have an authUser, store the user in localStorage.
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // Don't have an authUser, clear the localStorage.
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  }, [auth]);

  return { user };
};

export default useAuthListener;
