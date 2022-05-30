import { useEffect } from 'react';
import LoggedInUserContext from '../context/loggedInUser';
import useLoggedInUser from '../hooks/useLoggedInUser';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar/sidebar';

const DashboardPage = ({ user }) => {
  const loggedInUser = useLoggedInUser(user.uid);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={loggedInUser}>
      <div className='bg-gray-background'>
        <Header />
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md'>
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

export default DashboardPage;
