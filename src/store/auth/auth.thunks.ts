import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api/axiosInstance";
import { User } from "./auth.types";
import showApiError from "../../utils/showApiError";
import { AxiosError } from "axios";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const { data } = await api.post<{
        token: string;
        user: User;
        message?: string;
      }>("/auth/login", {
        username,
        password,
      });
      if (!data.token) {
        throw new Error(data.message);
      }
      Cookies.set("token", data.token);
      return { token: data.token };
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);
