import config from '../../config';
import axios from 'axios';

const getWalletByUserId = async userId => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}/wallets`;
  const response = await axios.get(fetchUserUrl);
  return response;
};

export default getWalletByUserId;
