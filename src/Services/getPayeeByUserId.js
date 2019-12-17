import config from '../../config';
import axios from 'axios';

const getPayeeByUserId = async userId => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}/payees`;
  return axios.get(fetchUserUrl);
};

export default getPayeeByUserId;
