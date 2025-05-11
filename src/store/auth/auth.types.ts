import { SliceStatuses } from "../types";

type User = {
  id: string;
  role: Roles;
  active: Status;
  status: Status;
  username: string;
  profilePicture?: string;
};

enum Roles {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

enum Status {
  ACTIVE = "1",
  INACTIVE = "0",
}

type AuthState = {
  token: string | null;
  status: SliceStatuses;
  error: string | null;
  user: User | null;
};

export type { User, AuthState };

export { Roles, Status };
