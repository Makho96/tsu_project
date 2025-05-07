import { CompaniesInitialState } from "./companies.types";
import { SliceStatuses } from "../types";

const initialState: CompaniesInitialState = {
  currentCompany: null,
  companies: [],
  status: SliceStatuses.IDLE,
  error: null,
};

export { initialState };
