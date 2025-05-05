type User = {
  id: string;
  role: Roles;
  active: Status;
  status: Status;
  username: string;
  profilePicture?: string;
};

enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

enum Status {
  ACTIVE = "1",
  INACTIVE = "0",
}

type AuthState = {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: User | null;
};

export type { User, AuthState };

export { Roles, Status };
