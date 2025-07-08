import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Language } from './languages.types';
import api from '../../api/axiosInstance';
import showApiError from '../../utils/showApiError';

export const getLanguages = createAsyncThunk<Language[]>('languages/getLanguages', async () => {
  try {
    const { data } = await api.get<Language[]>('/language');
    return data;
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});
