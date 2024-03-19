import { createAsyncThunk } from '@reduxjs/toolkit';

import { SliceNames } from '../enums';
import type { ThunkAsyncConfig } from '../types';
import type {
  FetchMessageResponse,
  FetchMessageRequest
} from './help.types';

const fetchSendMessageAction = createAsyncThunk<
  FetchMessageResponse,
  FetchMessageRequest,
  ThunkAsyncConfig
>(
  `${SliceNames.HELP}/fetchSignInAction`,
  async (
    signInRequestBody,
    {
      extra: {
        helpServices: { fetchMessageService },
      },
    },
  ) => {
    try {
      const data = await fetchMessageService(signInRequestBody);

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);


export {
  fetchSendMessageAction
};
