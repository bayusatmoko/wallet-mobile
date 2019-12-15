import config from '../../config';
import axios from 'axios';

const addTransaction = transaction => {
  const addTransactionUrl = `${config.API_URL}/transactions`;
  return axios.post(addTransactionUrl, transaction);
};

export default addTransaction;
