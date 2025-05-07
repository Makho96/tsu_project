import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginThunk, logoutThunk } from "./auth.thunks";
import { AuthState, User } from "./auth.types";
import { SliceStatuses } from "../types";

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  status: SliceStatuses.IDLE,
  error: null,
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.status = SliceStatuses.SUCCEEDED;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? "Login failed";
      });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
