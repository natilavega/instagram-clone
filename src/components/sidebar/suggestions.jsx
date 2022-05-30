import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSuggestedProfiles } from '../../services/firebase';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './suggestedProfile';

const Suggestions = ({ userId, following }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  const suggestedProfiles = async () => {
    await getSuggestedProfiles(userId, following).then((response) =>
      setProfiles(response)
    );
  };

  return !profiles ? (
    <Skeleton count={1} height={150} className='mt-5' />
  ) : profiles.length > 0 ? (
    <div className='rounded flex flex-col'>
      <div className='text-sm flex items-center align-items justify-between mb-2'>
        <p className='font-bold text-gray-base'>Suggestions for you</p>
      </div>
      <div className='mt-4 grid gap-5'>
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.userId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
};

export default Suggestions;
