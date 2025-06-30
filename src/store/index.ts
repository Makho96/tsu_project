import { configureStore } from '@reduxjs/toolkit';
import actionsFormReducer from './actionForm/actionsForm.slice';
import actionsReducer from './actions/actions.slice';
import authReducer from './auth/auth.slice';
import companiesReducer from './companies/companies.slice';
import departmentsReducer from './departments/departments.slice';
import recordingsReducer from './recordings/recordings.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companiesReducer,
    actions: actionsReducer,
    departments: departmentsReducer,
    actionsForm: actionsFormReducer,
    recordings: recordingsReducer,
  },
});
