import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { CreateDepartmentParams, Department } from './departments.types';
import api from '../../api/axiosInstance';
import showApiError from '../../utils/showApiError';
import { RootState } from '../hooks/useTypedSelector';

export const getDepartments = createAsyncThunk<Department[], number>(
  'departments/getDepartments',
  async (actionId, { getState }) => {
    const { currentCompany } = (getState() as RootState).companies;

    if (!currentCompany) return [];

    try {
      const { data } = await api.get(`/department/company/${currentCompany.id}/${actionId}`);
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const getDepartment = createAsyncThunk<Department, number>(
  'departments/getDepartment',
  async (id: number) => {
    try {
      const { data } = await api.get(`/department/${id}`);
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const deleteDepartment = createAsyncThunk<
  Department,
  {
    actionId: number;
    departmentId: number;
  }
>('departments/deleteDepartment', async ({ actionId, departmentId }, { dispatch }) => {
  try {
    const { data } = await api.delete(`/department/${departmentId}`);
    dispatch(getDepartments(actionId));
    return data;
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});

export const updateDepartment = createAsyncThunk<
  Department,
  Omit<Partial<Department>, 'id' | 'company' | 'action'> & {
    id: number;
    company: number;
    action: number;
  }
>('departments/updateDepartment', async (department, { dispatch }) => {
  try {
    const { data } = await api.put('/department', department);
    dispatch(getDepartments(department.action));
    return data;
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});

export const createDepartment = createAsyncThunk<Department, CreateDepartmentParams>(
  'departments/createDepartment',
  async (department, { dispatch }) => {
    try {
      const { data } = await api.post('/department', department);
      dispatch(getDepartments(department.action));
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);
