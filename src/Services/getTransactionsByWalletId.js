import config from '../../config';
import axios from 'axios';

const getTransactionsByWalletId = (userId, token) => {
  const fetchUserUrl = `${config.API_URL}/wallets/${userId}/transactions`;
  return axios.get(fetchUserUrl, {
    headers: { Authorization: token }
  });
};

export default getTransactionsByWalletId;
