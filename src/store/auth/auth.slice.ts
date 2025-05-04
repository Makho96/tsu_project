import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginThunk, logoutThunk } from "./auth.thunks";
import { AuthState } from "./auth.types";

console.log(Cookies.get("user"));

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  status: "idle",
  error: null,
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
        state.status = "loading";
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Login failed";
      });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.token = null;
    });
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
