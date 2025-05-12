import { ActionsState } from "./actions.types";
import { SliceStatuses } from "../types";

const initialState: ActionsState = {
  actions: [],
  status: SliceStatuses.IDLE,
  error: null,
};

export { initialState };
