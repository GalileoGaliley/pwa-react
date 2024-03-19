import { createSlice } from '@reduxjs/toolkit';

import { User } from './user.types';
import { SliceNames } from '../enums';

import {
  fetchSignInAction,
  fetchSignUpAction,
} from './user.actions';
import type {
  UserState,
} from './user.types';

const initialStateUser: User = {
  token: '',
  user: {
    email: '',
    name: '',
    id: 0,
  }
};

const initialState: UserState = {
  user: initialStateUser,
  loading: false,
};

const userSlice = createSlice({
  initialState,
  name: SliceNames.USER,
  reducers: {
    setUser (state, payload: {payload: User}) {
      state.user = payload.payload;
    },
    logOut (state) {
      state.user = initialStateUser;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignInAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;

        state.loading = false;
      })
      .addCase(fetchSignUpAction.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.loading = false;
      })
      .addCase(fetchSignUpAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSignUpAction.rejected,
        (state) => {
          state.loading = false;
        },
      )
  },
});

export const {
  reducer: userReducer,
  actions: {setUser, logOut},
} = userSlice;
