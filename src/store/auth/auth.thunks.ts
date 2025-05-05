import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import _omit from "lodash/omit";
import { User } from "./auth.types";
import api from "../../api/axiosInstance";
import showApiError from "../../utils/showApiError";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post<
        {
          token: string;
        } & User
      >("/auth/login", {
        username,
        password,
      });
      const user = _omit(data, ["token"]);
      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(user));
      return { token: data.token, user };
    } catch (error) {
      rejectWithValue(error);
      throw error;
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/auth/logout");
    Cookies.remove("token");
    Cookies.remove("user");
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});
