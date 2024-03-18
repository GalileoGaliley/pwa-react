
import { fetchSendMessage } from './fetchMessageService';
import type {
  FetchMessageRequest
} from '../../store/help/help.types';

class HelpServices {

  fetchMessageService = (body: FetchMessageRequest) => fetchSendMessage(body);

}

export const helpServices = new HelpServices();

