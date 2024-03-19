import axios from 'axios';
import {store} from "../store";

const baseURL = 'https://solar-wind.site/api/';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (request: any) => {
    const { getState } = store;
    const {user: {user: {token}}} = getState();

    const authHeader = token ? { Authorization: `${token}` } : {};
    return {
      ...request,
      headers: {
        ...request.headers,
        ...authHeader
      }
    }
  },
  (e) => {
    console.log(e);
  }
)
export { axiosInstance };
