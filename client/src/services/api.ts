import axios from 'axios';
import {store} from "../store";

import { setToast } from 'src/store/toast/toast.slice';

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
  async (e) => {
    return Promise.reject(e);
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (e) => {
    const dispatch = store.dispatch

    console.log(e.response.data.message);

    dispatch(setToast(e.response.data.message))
    console.log(e);
    return Promise.reject(e);
  }
)

export { axiosInstance };
