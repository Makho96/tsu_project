import axios from "axios";
import Cookies from "js-cookie";
import showApiError from "../utils/showApiError";
import { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://ropaprivacy.tsu.ge:8087/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    showApiError(err as AxiosError);
    return Promise.reject(err);
  }
);

export default api;
