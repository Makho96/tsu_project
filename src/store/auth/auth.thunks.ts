import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api/axiosInstance";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await api.post("/login", { email, password });
    Cookies.set("token", res.data.token);
    Cookies.set("user", JSON.stringify(res.data.user));
    return { token: res.data.token, user: res.data.user };
  }
);
