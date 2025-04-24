import axios from "axios";
import Cookies from "js-cookie";
// import { store } from "../store";
// import { setToken, logout } from "../store/auth/auth.slice";

const api = axios.create({
  baseURL: "https://your-api.com/api",
  withCredentials: true,
});

type QueueEntry = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let queue: QueueEntry[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  queue = [];
};

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          if (original.headers) {
            original.headers["Authorization"] = `Bearer ${token}`;
          }
          return api(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          "https://your-api.com/api/refresh",
          {},
          { withCredentials: true }
        );
        const newToken = res.data.token;
        Cookies.set("token", newToken);
        // store.dispatch(setToken(newToken));
        processQueue(null, newToken);
        return api(original);
      } catch (err) {
        // store.dispatch(logout());
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
