import { createAsyncThunk } from '@reduxjs/toolkit';

import { SliceNames } from '../enums';
import type { ThunkAsyncConfig } from '../types';
import type {
  FetchSignInResponse,
  FetchSignInRequest,
  FetchSignUpRequest,
  FetchSignUpResponse
} from './user.types';

const fetchSignInAction = createAsyncThunk<
  FetchSignInResponse,
  FetchSignInRequest,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchSignInAction`,
  async (
    signInRequestBody,
    {
      extra: {
        authServices: { fetchSignInService },
      },
    },
  ) => {
    try {
      const userData = await fetchSignInService(signInRequestBody);
      if (!userData.data.token) {
        return Promise.reject(new Error('Error'));
      }

      localStorage.setItem('user', JSON.stringify(userData.data));
      return userData;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

const fetchSignUpAction = createAsyncThunk<
  FetchSignUpResponse,
  FetchSignUpRequest,
  ThunkAsyncConfig
>(
  `${SliceNames.USER}/fetchSignUpAction`,
  async (
    signUpRequestBody,
    {
      extra: {
        authServices: { fetchSignUpService },
      },
    },
  ) => {
    try {
      const signUpData = await fetchSignUpService(signUpRequestBody);

      if (!signUpData.data.token) {
        return Promise.reject(new Error('Error'));
      }
      localStorage.setItem('user', JSON.stringify(signUpData.data));

      return signUpData;
    } catch (error) {
      return Promise.reject(new Error());
    }
  },
);

export {
  fetchSignInAction,
  fetchSignUpAction,
};
