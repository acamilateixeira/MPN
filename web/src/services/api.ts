import axios from 'axios';

import AuthServices from '../services/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(async config => {
  const token = AuthServices.getToken();

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
