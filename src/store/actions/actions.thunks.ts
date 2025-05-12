import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { Action } from "./actions.types";
import api from "../../api/axiosInstance";
import showApiError from "../../utils/showApiError";

export const getActions = createAsyncThunk(
  "actions/getActions",
  async (companyId: number) => {
    try {
      const { data } = await api.get<Action[]>(`/action/company/${companyId}`);
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);
