import { Action } from "../actions/actions.types";
import { Company } from "../companies/companies.types";
import { SliceStatuses } from "../types";

type Department = {
  id: number;
  title: string;
  contactPerson: string;
  tell: string;
  eMail: string;
  action: Action;
  company: Company;
  user: { userId: number };
};

type DepartmentsState = {
  departments: Department[];
  status: SliceStatuses;
  error: string | null;
};

type CreateDepartmentParams = Omit<
  Department,
  "id" | "user" | "action" | "company"
> & {
  action: number;
  company: number;
};

export type { Department, DepartmentsState, CreateDepartmentParams };
