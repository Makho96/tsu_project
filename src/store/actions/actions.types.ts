import { SliceStatuses } from "../types";

enum Statuses {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  ARCHIVED = "ARCHIVED",
}

type Action = {
  id: number;
  title: string;
  company: {
    id: number;
  };
  description: string;
  color: string;
  user: { userId: number };
  status: Statuses;
};

type ActionsState = {
  actions: Action[];
  status: SliceStatuses;
  error: string | null;
};

export { Statuses };

export type { Action, ActionsState };
