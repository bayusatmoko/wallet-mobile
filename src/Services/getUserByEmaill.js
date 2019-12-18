import config from '../../config';
import axios from 'axios';

const getUserByEmail = (userEmail, token) => {
  const fetchUserUrl = `${config.API_URL}/users?email=${userEmail}`;
  return axios.get(fetchUserUrl, {
    headers: { Authorization: token }
  });
};

export default getUserByEmail;
