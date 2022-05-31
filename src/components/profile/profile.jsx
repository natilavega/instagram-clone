import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPhotosByUserId } from '../../services/firebase';
import Header from './header';
import Photos from './photos';

const UserProfile = ({ user }) => {
  const [photosCollection, setPhotosCollection] = useState([]);
  const [followerCount, setFollowerCount] = useState(user.followers.length);

  useEffect(() => {
    getProfilePhotos();
  }, [user.userId]);

  const getProfilePhotos = async () => {
    await getPhotosByUserId(user.userId).then((photos) =>
      setPhotosCollection(photos)
    );
  };

  return (
    <>
      <Header
        photosCount={photosCollection.length}
        profile={user}
        followerCount={followerCount}
        setFollowerCount={setFollowerCount}
      />
      <Photos photos={photosCollection} />
    </>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default UserProfile;
