import config from '../../config';
import axios from 'axios';

const addPayee = (payee, token) => {
  const addPayeeUrl = `${config.API_URL}/payees`;
  return axios.post(addPayeeUrl, payee, {
    headers: { Authorization: token }
  });
};

export default addPayee;
