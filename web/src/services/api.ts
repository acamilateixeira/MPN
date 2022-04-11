import axios from 'axios';

import AuthServices from '../services/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(async config => {
  const tkey = AuthServices.getTkey();

  if (tkey) {
    config.headers = {
      Authorization: `Bearer ${tkey}`,
    };
  }

  return config;
});

export default api;
