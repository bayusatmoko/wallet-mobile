import config from '../../config';
import axios from 'axios';

const getWalletByUserId = async userId => {
  const fetchUserUrl = `${config.API_URL}/users/${userId}/wallets`;
  return axios.get(fetchUserUrl);
};

export default getWalletByUserId;
