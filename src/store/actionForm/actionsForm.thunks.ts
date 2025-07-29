import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { toClientActionFrom } from './actionsForm.dataConveters';
import { CreateFormInputParams, DeleteFormInputParams, RemoteFormInput } from './actionsForm.types';
import api from '../../api/axiosInstance';
import showApiError from '../../utils/showApiError';

export const getFormData = createAsyncThunk(
  'actionsForm/getFormData',
  async (actionId: number, { rejectWithValue }) => {
    try {
      const { data } = await api.get<RemoteFormInput[]>(`/form/action/${actionId}`);
      return data.map(toClientActionFrom);
    } catch (error) {
      showApiError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);

export const createFormInput = createAsyncThunk(
  'actionsForm/createFormInput',
  async (params: CreateFormInputParams, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post('/form', params);
      dispatch(getFormData(params.action));
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);

export const updateFormInput = createAsyncThunk(
  'actionsForm/updateFormInput',
  async (params: CreateFormInputParams & { id: number }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.put('/form', params);
      dispatch(getFormData(params.action));
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);

export const deleteFormInput = createAsyncThunk(
  'actionsForm/deleteFormInput',
  async (params: DeleteFormInputParams, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/form/${params.id}`);
      dispatch(getFormData(params.actionId));
    } catch (error) {
      showApiError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);
