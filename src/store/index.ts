import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import companiesReducer from "./companies/companies.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companiesReducer,
  },
});
