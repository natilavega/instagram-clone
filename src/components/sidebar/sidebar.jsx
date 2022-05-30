import { useContext } from 'react';
import LoggedInUserContext from '../../context/loggedInUser';
import Suggestions from './suggestions';
import User from './user';

const Sidebar = () => {
  const {
    user: { userId, username, fullName, following },
  } = useContext(LoggedInUserContext);

  return (
    <div>
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} />
    </div>
  );
};

export default Sidebar;
