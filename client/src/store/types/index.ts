import type {
  AnyAction,
  PayloadAction as ReduxPayloadAction,
  Dispatch,
  Reducer,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { authServices } from '../../services/auth';
import { helpServices } from '../../services/help';

import { UserState } from '../user/user.types';
import {HelpState} from "../help/help.types";
import {ToastState} from "../toast/toast.types";

export type PayloadAction<T> = ReduxPayloadAction<T>;

type Dependencies = {
  authServices: typeof authServices;
  helpServices: typeof helpServices;
};

type AppDispatch = Dispatch & ThunkDispatch<RootState, Dependencies, AnyAction>;

type ThunkAsyncConfig = {
  extra: Dependencies;
  state: RootState;
  dispatch: AppDispatch;
};

type RequestSendFeedback = {
  phone: string;
  email: string;
  notifyByEmail: boolean;
  msg: string;
};
type RootState = {
  user: UserState;
  help: HelpState;
  toast: ToastState;
}

type ThunkMiddlewareOptions = {
  thunk: {
    extraArgument: Dependencies;
  };
};

type Middlewares = ThunkMiddlewareFor<RootState, ThunkMiddlewareOptions>[];

type MainState = Omit<RootState, '_persist'>;

type Reducers = { [K in keyof MainState]: Reducer<MainState[K], AnyAction> };

export type {
  ThunkAsyncConfig,
  RootState,
  Dependencies,
  Middlewares,
  RequestSendFeedback,
  Reducers,
};
