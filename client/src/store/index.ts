import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";

const RootReducer = combineReducers({
  auth: authSlice
});

export const makeStore = () =>
  configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
