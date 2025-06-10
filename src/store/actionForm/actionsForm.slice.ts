import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./actionsForm.consts";
import { getFormData } from "./actionsForm.thunks";
import { SliceStatuses } from "../types";
const actionsFormSlice = createSlice({
  name: "actionsForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFormData.pending, (state) => {
      state.status = SliceStatuses.LOADING;
    });
    builder.addCase(getFormData.fulfilled, (state, action) => {
      state.status = SliceStatuses.SUCCEEDED;
      state.formInputs = action.payload;
    });
    builder.addCase(getFormData.rejected, (state, action) => {
      state.status = SliceStatuses.FAILED;
      state.error = action.payload as string;
    });
  },
});

export default actionsFormSlice.reducer;
