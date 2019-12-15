import config from '../../config';
import axios from 'axios';

const getUserByEmail = userEmail => {
  const fetchUserUrl = `${config.API_URL}/users?email=${userEmail}`;
  return axios.get(fetchUserUrl);
};

export default getUserByEmail;
