import config from '../../config';
import axios from 'axios';

const getWalletByUserId = async (userId, token) => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}/wallets`;
  const response = await axios.get(fetchUserUrl, {
    headers: { Authorization: token }
  });
  return response;
};

export default getWalletByUserId;
