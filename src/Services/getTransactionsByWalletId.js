import config from '../../config';
import axios from 'axios';

const getTransactionsByWalletId = async userId => {
  try {
    const fetchUserUrl = `${config.API_URL}/wallets/${userId}/transactions`;
    return axios.get(fetchUserUrl);
  } catch (e) {
    return e.message;
  }
};

export default getTransactionsByWalletId;
