import config from '../../config';
import axios from 'axios';

const getLastTransactionsByWalletId = async (userId, token) => {
  const fetchUserUrl = `${
    config.API_URL
  }/wallets/${userId}/transactions?limit=5`;
  return axios.get(fetchUserUrl, {
    headers: { Authorization: token }
  });
};

export default getLastTransactionsByWalletId;
