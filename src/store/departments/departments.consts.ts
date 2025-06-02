import { SliceStatuses } from "../types";
import { DepartmentsState } from "./departments.types";

const initialState: DepartmentsState = {
  departments: [],
  status: SliceStatuses.IDLE,
  error: null,
};

export { initialState };
