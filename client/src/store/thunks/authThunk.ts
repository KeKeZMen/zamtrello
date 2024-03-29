import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import $api from "../../http/axiosApi";
import IAuthResponse from "../../models/IAuthResponse";

export type RegisterType = {
  login: string;
  password: string;
  email: string
};

export type LoginType = {
  login: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ login, password }: LoginType, thunkApi) => {
    try {
      const result = await $api.post<IAuthResponse>("/users/login", { login, password });
      localStorage.setItem("token", result.data.accessToken)
      return result.data.user;
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const reauthUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const result = await axios.get<IAuthResponse>(`${import.meta.env.VITE_SERVER_URL}/api/users/refresh`, { withCredentials: true });
      localStorage.setItem('token', result.data.accessToken);
      return result.data.user;
    } catch (axiosError) {
      const error = axiosError as AxiosError
      return thunkApi.rejectWithValue(error.response?.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      localStorage.clear()
      return await $api.post("/users/logout");
    } catch (axiosError) {
      const error = axiosError as AxiosError 
      return thunkApi.rejectWithValue(error.response?.data)
    }
  }
)

export const registrationUser = createAsyncThunk(
  "auth/registration",
  async ({ login, password, email }: RegisterType, thunkApi) => {
    try {
      const result = await $api.post<IAuthResponse>("/users/registration", { login, password, email });
      localStorage.setItem("token", result.data.accessToken);
      return result.data.user;
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);