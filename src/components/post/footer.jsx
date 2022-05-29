import PropTypes from 'prop-types';

const Footer = ({ username, caption }) => {
  return (
    <div className='p-4 pt-2 pb-1'>
      <span className='mr-1 font-bold'>{username}</span>
      <span className='italic'>{caption}</span>
    </div>
  );
};

Footer.propTypes = {
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default Footer;
