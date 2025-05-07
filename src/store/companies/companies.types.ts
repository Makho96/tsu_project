import { User } from "../auth/auth.types";
import { SliceStatuses } from "../types";

type Company = {
  id: number;
  title: string;
  user: User;
  eMail: string;
  tell: string;
  address?: string;
};

type CompaniesInitialState = {
  currentCompany: Company | null;
  companies: Company[];
  status: SliceStatuses;
  error: string | null;
};

export type { Company, CompaniesInitialState };
