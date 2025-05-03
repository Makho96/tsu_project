import axios from "axios";
import Cookies from "js-cookie";
// import { store } from "../store";
// import { setToken, logout } from "../store/auth/auth.slice";

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
    return Promise.reject(err);
  }
);

export default api;
