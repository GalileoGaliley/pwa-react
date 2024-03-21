import { createSlice } from '@reduxjs/toolkit';


import { SliceNames } from '../enums';

import type {
  ToastState,
} from './toast.types';

const initialState: ToastState = {
  data: '',
};

const toastSlice = createSlice({
  initialState,
  name: SliceNames.TOAST,
  reducers: {
    setToast (state, payload: {payload: string}) {
      state.data = payload.payload;
    },
    clearToast (state) {
      state.data = '';
    },
  },
  extraReducers: () => {},
});

export const {
  reducer: toastReducer,
  actions: {setToast, clearToast},
} = toastSlice;
