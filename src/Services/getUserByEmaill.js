import config from '../../config';
import axios from 'axios';

const getUserByEmail = userEmail => {
  try {
    const fetchUserUrl = `${config.API_URL}/users?email=${userEmail}`;
    return axios.get(fetchUserUrl);
  } catch (error) {
    return error.message;
  }
};

export default getUserByEmail;
