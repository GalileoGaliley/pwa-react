import { endpoints } from '../../store/endpoints';
import { axiosInstance as axios } from '../api';
import type {
  FetchMessageRequest,
  FetchMessageResponse
} from '../../store/help/help.types';

const {
  help: { message: messageUrl },
} = endpoints;

const fetchSendMessage = async (
  body: FetchMessageRequest,
): Promise<FetchMessageResponse> => {
  try {
    const { data } = await axios.post<FetchMessageResponse>(messageUrl, body);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { fetchSendMessage };
