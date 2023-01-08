import axios from 'axios';
import { ROOT_URL, SHOW_LOG } from '../constants';

const axiosClient = axios.create({
    headers: {
      'Accept': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      return error;
    }
);

axiosClient.interceptors.request.use(async (config) => {
    config.baseURL  = ROOT_URL;
    config.timeout  = 5000;

    (SHOW_LOG) && console.log(`url_api (${config.method}) : ${config.baseURL}${config.url}`);

    return config;
});

export default axiosClient;