import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { getUserByUsername } from '../services/firebase';
import Header from '../components/header';
import UserProfile from '../components/profile/profile';

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(false);

  useEffect(() => {
    checkIfUserExists();
  }, [username, navigate]);

  const checkIfUserExists = async () => {
    const result = await getUserByUsername(username);
    if (result?.userId) {
      setUser(result);
    } else {
      navigate(ROUTES.NOT_FOUND);
    }
  };

  return (
    user?.username && (
      <div className='bg-gray-background'>
        <Header />
        <div className='mx-auto max-w-screen-md'>
          <UserProfile user={user} />
        </div>
      </div>
    )
  );
};

export default ProfilePage;
