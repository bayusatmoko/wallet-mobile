import config from '../../config';
import axios from 'axios';

const getLastTransactionsByWalletId = async userId => {
  const fetchUserUrl = `${
    config.API_URL
  }/wallets/${userId}/transactions?limit=5`;
  return axios.get(fetchUserUrl);
};

export default getLastTransactionsByWalletId;
