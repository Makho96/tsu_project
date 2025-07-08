import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './languages.consts';
import { SliceStatuses } from '../types';
import { getLanguages } from './languages.thunks';

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.status = SliceStatuses.LOADING;
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.status = SliceStatuses.SUCCEEDED;
      state.languages = action.payload;
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.status = SliceStatuses.FAILED;
    });
  },
});

export default languagesSlice.reducer;
