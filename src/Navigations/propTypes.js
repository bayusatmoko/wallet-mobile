import PropTypes from 'prop-types';

const navigationPropTypes = PropTypes.shape({
  getParam: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
});

export default navigationPropTypes;
