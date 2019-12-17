import config from '../../config';
import axios from 'axios';

const addTransaction = (transaction, token) => {
  const addTransactionUrl = `${config.API_URL}/transactions`;
  return axios.post(addTransactionUrl, transaction, {
    headers: { Authorization: token }
  });
};

export default addTransaction;
