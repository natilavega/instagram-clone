import { useContext } from 'react';
import LoggedInUserContext from '../../context/loggedInUser';
import Suggestions from './suggestions';
import User from './user';

const Sidebar = () => {
  const {
    user: { userId, username, fullName, following },
  } = useContext(LoggedInUserContext);

  return (
    <div className='hidden md:block md:px-2 md:pt-2'>
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} />
    </div>
  );
};

export default Sidebar;
