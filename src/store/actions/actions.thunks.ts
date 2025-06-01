import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { Action } from "./actions.types";
import api from "../../api/axiosInstance";
import { FormValues } from "../../components/shared/ActionsModal/ActionsModal.types";
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

export const createAction = createAsyncThunk(
  "actions/createAction",
  async (params: FormValues & { company: number }, { dispatch }) => {
    try {
      const { data } = await api.post<void>("/action", params);
      dispatch(getActions(params.company));
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const updateAction = createAsyncThunk(
  "actions/updateAction",
  async (
    params: FormValues & { company: number; id: number },
    { dispatch }
  ) => {
    try {
      const { data } = await api.put<void>("/action", params);
      dispatch(getActions(params.company));
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const getAction = createAsyncThunk(
  "actions/getAction",
  async (id: number) => {
    try {
      const { data } = await api.get<Action>(`/action/${id}`);
      return data;
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);

export const deleteAction = createAsyncThunk(
  "actions/deleteAction",
  async (
    { id, companyId }: { id: number; companyId: number },
    { dispatch }
  ) => {
    try {
      await api.delete(`/action/${id}`);
      dispatch(getActions(companyId));
    } catch (error) {
      showApiError(error as AxiosError);
      throw error;
    }
  }
);
