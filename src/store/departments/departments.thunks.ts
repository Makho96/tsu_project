import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { CreateDepartmentParams, Department } from "./departments.types";
import api from "../../api/axiosInstance";
import showApiError from "../../utils/showApiError";

export const getDepartments = createAsyncThunk<Department[]>(
  "departments/getDepartments",
  async () => {
    try {
      const { data } = await api.get("/department");
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const getDepartment = createAsyncThunk<Department, number>(
  "departments/getDepartment",
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

export const deleteDepartment = createAsyncThunk<Department, number>(
  "departments/deleteDepartment",
  async (id: number, { dispatch }) => {
    try {
      const { data } = await api.delete(`/department/${id}`);
      dispatch(getDepartments());
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const updateDepartment = createAsyncThunk<
  Department,
  Omit<Partial<Department>, "id" | "company" | "action"> & {
    id: number;
    company: number;
    action: number;
  }
>("departments/updateDepartment", async (department, { dispatch }) => {
  try {
    const { data } = await api.put(`/department/${department.id}`, department);
    dispatch(getDepartments());
    return data;
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});

export const createDepartment = createAsyncThunk<
  Department,
  CreateDepartmentParams
>("departments/createDepartment", async (department, { dispatch }) => {
  try {
    const { data } = await api.post("/department", department);
    dispatch(getDepartments());
    return data;
  } catch (error) {
    showApiError(error as AxiosError);
    throw error;
  }
});
