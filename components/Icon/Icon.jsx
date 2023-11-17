import PropTypes from 'prop-types';

const Icon = ({ iconPath, className }) => {
  return (
      <img src={iconPath} alt="Icon" className={className} />
  );
};

Icon.propTypes = {
    iconPath: PropTypes.string,
    className: PropTypes.string
};

export default Icon;
