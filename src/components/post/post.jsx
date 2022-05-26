const Post = ({ content }) => {
  return (
    <div className='rounded col-span-4 border bg-white border-gray-primary mb-12'>
      <h6>{content.username}</h6>
      <img src={content.imageSrc} alt='' />
      <p>{content.caption}</p>
    </div>
  );
};

export default Post;
