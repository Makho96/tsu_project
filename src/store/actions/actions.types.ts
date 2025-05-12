import { SliceStatuses } from "../types";

type Action = {
  id: number;
  title: string;
  company: {
    id: number;
  };
  description: string;
  color: string;
  user: { userId: number };
};

type ActionsState = {
  actions: Action[];
  status: SliceStatuses;
  error: string | null;
};

export type { Action, ActionsState };
