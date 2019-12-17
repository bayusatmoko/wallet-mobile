import config from '../../config';
import axios from 'axios';

const userLogin = credential => {
  const loginUrl = `${config.API_URL}/login`;
  return axios.post(loginUrl, credential);
};

export default userLogin;
