import config from '../../config';
import axios from 'axios';

const getTransactionsByWalletId = userId => {
  const fetchUserUrl = `${config.API_URL}/wallets/${userId}/transactions`;
  return axios.get(fetchUserUrl);
};

export default getTransactionsByWalletId;
