import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./companies.consts";
import { createCompany, getCompanies, getCompany } from "./companies.thunks";
import { SliceStatuses } from "../types";

const companiesSlice = createSlice({
  name: "companies",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.status = SliceStatuses.SUCCEEDED;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? "Failed to get companies";
      });
    builder
      .addCase(getCompany.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.status = SliceStatuses.SUCCEEDED;
        state.currentCompany = action.payload;
      });
    builder.addCase(getCompany.rejected, (state, action) => {
      state.status = SliceStatuses.FAILED;
      state.error = action.error.message ?? "Failed to get company";
    });
    builder.addCase(createCompany.pending, (state) => {
      state.status = SliceStatuses.LOADING;
    });
    builder.addCase(createCompany.fulfilled, (state) => {
      state.status = SliceStatuses.SUCCEEDED;
    });
    builder.addCase(createCompany.rejected, (state, action) => {
      state.status = SliceStatuses.FAILED;
      state.error = action.error.message ?? "Failed to create company";
    });
  },
});

export default companiesSlice.reducer;
