import { useContext } from 'react';
import LoggedInUserContext from '../context/loggedInUser';
import usePhotos from '../hooks/usePhotos';
import Skeleton from 'react-loading-skeleton';
import Post from './post/post';

const Timeline = () => {
  const { user, user: { following } = [] } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  return (
    <div className='container col-span-2'>
      {following === undefined ? (
        <Skeleton count={2} width={400} height={400} className='mb-5' />
      ) : photos.length > 0 ? (
        photos.map((content) => (
          <Post key={content.photoId} content={content} />
        ))
      ) : (
        <p className='flex justify-center font-bold'>
          Follow other people to see Photos.
        </p>
      )}
    </div>
  );
};

export default Timeline;
