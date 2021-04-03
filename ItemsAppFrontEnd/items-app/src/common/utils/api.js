import axios from 'axios';
import https from 'https';

const api = axios.create({
  baseURL: "https://itemsapp.azurewebsites.net",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

api.interceptors.request.use((config) => {
  /* eslint-disable no-param-reassign */
  config.headers = {
    Accept: 'application/json',
    withCredentials: true,
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  };

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {    
    return Promise.reject(error);
  },
);

export default api;
