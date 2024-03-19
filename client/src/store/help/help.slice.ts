import { createSlice } from '@reduxjs/toolkit';

import {HelpState, Message} from './help.types';
import { SliceNames } from '../enums';

import {
  fetchSendMessageAction,
} from './help.actions';

const initialState: HelpState = {
  messages: [],
  loading: false
};

const helpSlice = createSlice({
  initialState,
  name: SliceNames.HELP,
  reducers: {
    pushMessage (state, payload: {payload: Message}) {
      console.log(payload.payload);
      state.messages.push(payload.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSendMessageAction.fulfilled, (state, { payload }) => {
        state.messages = payload.data.messages;
        state.historyId = payload.data.id;
        state.loading = false;
      })
      .addCase(fetchSendMessageAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSendMessageAction.rejected,
        (state) => {
          state.loading = false;
        },
      )
  },
});

export const {
  reducer: helpReducer,
  actions: {pushMessage},
} = helpSlice;
