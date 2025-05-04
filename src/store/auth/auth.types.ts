type User = {
  id: string;
  email: string;
  role: string;
};

type AuthState = {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type { User, AuthState };
