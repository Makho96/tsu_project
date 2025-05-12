import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./actions.consts";
import { getActions } from "./actions.thunks";
import { SliceStatuses } from "../types";

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActions.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(getActions.fulfilled, (state, action) => {
        state.status = SliceStatuses.SUCCEEDED;
        state.actions = action.payload;
      })
      .addCase(getActions.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? "Failed to get actions";
      });
  },
});

export default actionsSlice.reducer;
