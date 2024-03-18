
import { fetchSignIn } from './fetchSignInService';
import { fetchSignUp } from './fetchSignUpService';
import type {
  FetchSignInRequest,
  FetchSignUpRequest,
} from '../../store/user/user.types';

class AuthServices {

  fetchSignInService = (body: FetchSignInRequest) => fetchSignIn(body);

  fetchSignUpService = (body: FetchSignUpRequest) => fetchSignUp(body);
}

export const authServices = new AuthServices();

