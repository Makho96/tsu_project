import { ActionFormState } from "./actionsForm.types";
import { SliceStatuses } from "../types";

const initialState: ActionFormState = {
  formInputs: [],
  status: SliceStatuses.IDLE,
  error: null,
};

export { initialState };
