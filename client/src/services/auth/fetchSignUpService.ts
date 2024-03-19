import { endpoints } from '../../store/endpoints';
import { axiosInstance as axios } from '../api';
import type {
  FetchSignInRequest,
  FetchSignInResponse,
} from '../../store/user/user.types';

const {
  auth: { register: registerUrl },
} = endpoints;

const fetchSignUp = async (
  body: FetchSignInRequest,
): Promise<FetchSignInResponse> => {
  try {
    const { data } = await axios.post<FetchSignInResponse>(registerUrl, body);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { fetchSignUp };
