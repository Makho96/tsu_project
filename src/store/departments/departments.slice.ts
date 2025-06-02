import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./departments.consts";
import { getDepartments } from "./departments.thunks";
import { SliceStatuses } from "../types";

const departmentsSlice = createSlice({
  name: "departments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartments.pending, (state) => {
      state.status = SliceStatuses.LOADING;
    });
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.status = SliceStatuses.SUCCEEDED;
      state.departments = action.payload;
    });
    builder.addCase(getDepartments.rejected, (state) => {
      state.status = SliceStatuses.FAILED;
    });
  },
});

export default departmentsSlice.reducer;
