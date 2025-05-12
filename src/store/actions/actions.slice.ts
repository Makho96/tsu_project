import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./actions.consts";
import { createAction, getActions, updateAction } from "./actions.thunks";
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
    builder
      .addCase(createAction.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(createAction.fulfilled, (state) => {
        state.status = SliceStatuses.SUCCEEDED;
      })
      .addCase(createAction.rejected, (state) => {
        state.status = SliceStatuses.FAILED;
      });
    builder
      .addCase(updateAction.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(updateAction.fulfilled, (state) => {
        state.status = SliceStatuses.SUCCEEDED;
      })
      .addCase(updateAction.rejected, (state) => {
        state.status = SliceStatuses.FAILED;
      });
  },
});

export default actionsSlice.reducer;
