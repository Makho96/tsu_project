import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Recordings, SaveRecordingsParams, UpdateRecordingsParams } from './recordings.types';
import api from '../../api/axiosInstance';
import showApiError from '../../utils/showApiError';

export const saveRecordings = createAsyncThunk(
  'recordings/saveRecordings',
  async (recordings: SaveRecordingsParams, { dispatch }) => {
    try {
      const { data } = await api.post('/form-result', recordings);
      await dispatch(getRecordings(recordings.department));
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const getRecordings = createAsyncThunk(
  'recordings/getRecordings',
  async (department: number) => {
    try {
      const { data } = await api.get<Array<{ details: Recordings[]; id: number }>>(
        `/form-result/department/${department}`
      );

      const recordings = data.map((item) => {
        const inboObject: {
          id: number;
          data: Record<string, Recordings>;
        } = { id: item.id, data: {} };
        item.details.forEach((info) => {
          inboObject.data[info.formName] = info;
        });
        return inboObject;
      });

      return recordings;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const deleteRecording = createAsyncThunk(
  'recordings/deleteRecording',
  async ({ id, departmentId }: { id: number; departmentId: number }, { dispatch }) => {
    try {
      await api.delete(`/form-result/${id}`);
      await dispatch(getRecordings(departmentId));
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const updateRecordings = createAsyncThunk(
  'recordings/updateRecordings',
  async (recordings: UpdateRecordingsParams, { dispatch }) => {
    try {
      await api.put('/form-result', recordings);
      await dispatch(getRecordings(recordings.department));
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);
