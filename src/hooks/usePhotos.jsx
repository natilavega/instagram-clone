import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

const usePhotos = (user) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  const getTimelinePhotos = async () => {
    // check if the user follows people
    if (user?.following?.length > 0) {
      const followedUserPhotos = await getPhotos(user.userId, user.following);
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
  };

  return { photos };
};

export default usePhotos;
