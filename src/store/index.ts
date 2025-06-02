import { configureStore } from "@reduxjs/toolkit";
import actionsReducer from "./actions/actions.slice";
import authReducer from "./auth/auth.slice";
import companiesReducer from "./companies/companies.slice";
import departmentsReducer from "./departments/departments.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companiesReducer,
    actions: actionsReducer,
    departments: departmentsReducer,
  },
});
