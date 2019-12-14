import config from '../../config';
import axios from 'axios';

const findUser = async (username, password) => {
  const fetchUserUrl = `${config.API_URL}/login`;
  const payload = {
    username,
    password
  };
  return axios.post(fetchUserUrl, payload);
};

export default findUser;
