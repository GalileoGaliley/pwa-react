export interface User {
  user: {
    id: number;
    name: string;
    email: string;
  }
  token: string;
}

export interface FetchSignInRequest {
  email: string;
  password: string;
}

export interface FetchSignUpRequest {
  name: string;
  email: string;
  password: string;
  duplicatePassword: string;
}

export interface UserState {
  user: User;
  loading: boolean;
}

export interface FetchSignUpResponse {
  data: User
}

export interface FetchSignInResponse {
  data: User
}
