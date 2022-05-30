import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAuthListener from '../../hooks/useAuthListener';
import {
  isUserFollowingProfile,
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from '../../services/firebase';
import Skeleton from 'react-loading-skeleton';

const Header = ({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    userId: profileId,
    fullName,
    followers,
    following,
    username: profileUsername,
  },
}) => {
  const { user } = useAuthListener();

  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.uid !== profileId;

  useEffect(() => {
    if (user?.uid && profileId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.uid, profileId]);

  const isLoggedInUserFollowingProfile = async () => {
    const isFollowing = await isUserFollowingProfile(user.uid, profileId);
    setIsFollowingProfile(isFollowing);
  };

  const handleToggleFollow = async () => {
    setIsFollowingProfile(!isFollowingProfile);
    setFollowerCount(
      isFollowingProfile ? followerCount - 1 : followerCount + 1
    );

    await updateLoggedInUserFollowing(user.uid, profileId, isFollowingProfile);
    await updateFollowedUserFollowers(profileId, user.uid, isFollowingProfile);
  };

  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-md'>
      <div className='container flex justify-center items-center'>
        {profileUsername ? (
          <img
            className='rounded-full h-40 w-40 flex'
            alt={`${fullName} profile picture`}
            src={`/images/avatars/${profileUsername}.jpg`}
            onError={(e) => {
              e.target.src = '/images/avatars/default.png';
            }}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
              type='button'
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className='container flex mt-4'>
          {!followers || !following ? (
            <Skeleton count={1} width={500} height={24} />
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span> photos
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{following?.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};

export default Header;
