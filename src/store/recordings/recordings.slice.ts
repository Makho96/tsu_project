import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './recordings.consts';
import { getRecordings } from './recordings.thunks';
import { SliceStatuses } from '../types';

const recordingsSlice = createSlice({
  name: 'recordings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecordings.pending, (state) => {
        state.status = SliceStatuses.LOADING;
      })
      .addCase(getRecordings.fulfilled, (state, action) => {
        state.status = SliceStatuses.SUCCEEDED;
        state.recordings = action.payload;
      })
      .addCase(getRecordings.rejected, (state, action) => {
        state.status = SliceStatuses.FAILED;
        state.error = action.error.message ?? 'Failed to get recordings';
      });
  },
});

export default recordingsSlice.reducer;
