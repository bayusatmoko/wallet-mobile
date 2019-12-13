import config from '../../config';
import axios from 'axios';

const getUserById = async userId => {
  try {
    const fetchUserUrl = `${config.API_URL}/users/${userId}`;
    return axios.get(fetchUserUrl);
  } catch (e) {
    return e.message;
  }
};

export default getUserById;
