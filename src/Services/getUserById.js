import config from '../../config';
import axios from 'axios';

const getUserById = (userId, token) => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}`;
  return axios.get(fetchUserUrl, {
    headers: { Authorization: token }
  });
};

export default getUserById;
