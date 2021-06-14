import axios from 'axios';

const baseURL = 'https://brasilapi.com.br/api';
const cepURL = '/cep/v1/';

const api = axios.create({ baseURL });

export const getCEP = async (cep) => {
  return api
    .get(cepURL + cep)
    .then(({ data }) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default api;
