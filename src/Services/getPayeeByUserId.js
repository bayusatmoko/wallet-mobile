import config from '../../config';
import axios from 'axios';

const getPayeeByUserId = async (userId, token) => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}/payees`;
  return axios.get(fetchUserUrl, {
    headers: { Authorization: token }
  });
};

export default getPayeeByUserId;
