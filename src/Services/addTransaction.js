import config from '../../config';
import axios from 'axios';

const addTransaction = transaction => {
  try {
    const addTransactionUrl = `${config.API_URL}/transactions`;
    return axios.post(addTransactionUrl, transaction);
  } catch (error) {
    return error.message;
  }
};

export default addTransaction;
