import React, { useEffect } from 'react';
import LoggedInUserContext from '../context/loggedInUser';
import useActiveUser from '../hooks/useActiveUser';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

const DashboardPage = ({ user }) => {
  const activeUser = useActiveUser(user.uid);

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <LoggedInUserContext.Provider value={activeUser}>
      <div className='bg-gray-background'>
        <Header />
        <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

export default DashboardPage;
