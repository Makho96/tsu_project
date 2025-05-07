import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { Company } from "./companies.types";
import api from "../../api/axiosInstance";
import showApiError from "../../utils/showApiError";

export const getCompanies = createAsyncThunk(
  "companies/getCompanies",
  async () => {
    try {
      const { data } = await api.get("/company");
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const createCompany = createAsyncThunk(
  "companies/createCompany",
  async (company: Omit<Company, "id" | "user">, { dispatch }) => {
    try {
      const { data } = await api.post("/company", company);
      dispatch(getCompanies());
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const getCompany = createAsyncThunk(
  "companies/getCompany",
  async (id: number) => {
    try {
      const { data } = await api.get(`/company/${id}`);
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
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
