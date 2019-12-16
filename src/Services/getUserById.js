import config from '../../config';
import axios from 'axios';

const getUserById = userId => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}`;
  return axios.get(fetchUserUrl);
};

export default getUserById;
