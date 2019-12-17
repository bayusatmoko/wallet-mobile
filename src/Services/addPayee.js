import config from '../../config';
import axios from 'axios';

const addPayee = payee => {
  const addPayeeUrl = `${config.API_URL}/payees`;
  return axios.post(addPayeeUrl, payee);
};

export default addPayee;
