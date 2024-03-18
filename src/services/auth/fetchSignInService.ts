import { endpoints } from '../../store/endpoints';
import { axiosInstance as axios } from '../api';
import type {
  FetchSignInRequest,
  FetchSignInResponse,
} from '../../store/user/user.types';

const {
  auth: { login: loginUrl },
} = endpoints;

const fetchSignIn = async (
  body: FetchSignInRequest,
): Promise<FetchSignInResponse> => {
  try {
    const { data } = await axios.post<FetchSignInResponse>(loginUrl, body);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { fetchSignIn };
