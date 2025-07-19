import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import _keyBy from 'lodash/keyBy';
import { toClientCompany } from './companies.dataContverters';
import { CreateCompanyParams, RemoteCompany, UpdateCompanyParams } from './companies.types';
import api from '../../api/axiosInstance';
import showApiError from '../../utils/showApiError';

export const getCompanies = createAsyncThunk('companies/getCompanies', async () => {
  try {
    const { data } = await api.get<RemoteCompany[]>('/company');
    const companiesWithTranslations = data.map(toClientCompany);
    return companiesWithTranslations;
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});

export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (company: CreateCompanyParams, { dispatch }) => {
    try {
      const { data } = await api.post('/company', { translationCompanies: company });
      dispatch(getCompanies());
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const getCompany = createAsyncThunk('companies/getCompany', async (id: number) => {
  try {
    const { data } = await api.get<RemoteCompany>(`/company/${id}`);
    return toClientCompany(data);
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id: number, { dispatch }) => {
    try {
      await api.delete(`/company/${id}`);
      dispatch(getCompanies());
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (company: UpdateCompanyParams, { dispatch }) => {
    try {
      const { data } = await api.put(`/company`, company);
      await dispatch(getCompanies());
      return toClientCompany(data);
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);
