import config from '../../config';
import axios from 'axios';

const getWalletByUserId = async userId => {
  try {
    const fetchUserUrl = `${config.API_URL}/users/${userId}/wallets`;
    return axios.get(fetchUserUrl);
  } catch (e) {
    return e.message;
  }
};

export default getWalletByUserId;
