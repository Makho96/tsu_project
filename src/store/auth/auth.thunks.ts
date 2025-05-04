import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import api from "../../api/axiosInstance";
import showApiError from "../../utils/showApiError";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const { data } = await api.post<{
        token: string;
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

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/auth/logout");
    Cookies.remove("token");
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});
