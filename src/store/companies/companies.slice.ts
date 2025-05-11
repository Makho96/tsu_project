import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./companies.consts";
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from "./companies.thunks";
import { SliceStatuses } from "../types";
import { Company } from "./companies.types";

const companiesSlice = createSlice({
  name: "companies",
  initialState: initialState,
  reducers: {
    setSelectedCompany: (state, action: PayloadAction<Company>) => {
      state.currentCompany = action.payload;
    },
  },
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
      .addCase(getCompany.fulfilled, (state) => {
        state.status = SliceStatuses.SUCCEEDED;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? "Failed to get company";
      });
    builder
      .addCase(createCompany.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.status = SliceStatuses.SUCCEEDED;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? "Failed to create company";
      });
    builder
      .addCase(updateCompany.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(updateCompany.fulfilled, (state) => {
        state.status = SliceStatuses.SUCCEEDED;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? "Failed to update company";
      });
  },
});

export const { setSelectedCompany } = companiesSlice.actions;

export default companiesSlice.reducer;
