import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { helpServices } from '../services/help';
import {authServices} from '../services/auth';
import {userReducer} from "./user/user.slice";
import {helpReducer} from "./help/help.slice";

import type {
  Dependencies,
  Middlewares,
  Reducers,
  RootState,
} from './types';


const dependencies: Dependencies = {
  authServices,
  helpServices,
};

const reducers: Reducers = {
  user: userReducer,
  help: helpReducer,
};

const rootReducer = combineReducers(reducers);

export const store = configureStore<RootState, AnyAction, Middlewares>({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: dependencies,
      },
    }),
});
