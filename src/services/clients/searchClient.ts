import ApiClient from '../network/ApiClient';
import { ApiConfiguration } from '../network/ApiConfiguration';

const searchClient = new ApiClient(
  new ApiConfiguration({
    baseURL: import.meta.env.VITE_SEARCH_API,
    requestUse: (config) => {
      config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_SEARCH_APIKEY}`;

      return config;
    }
  })
);

export default searchClient;
