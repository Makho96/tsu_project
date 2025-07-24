import { Action } from '../actions/actions.types';
import { Company } from '../companies/companies.types';
import { SliceStatuses } from '../types';

type Department = {
  id: number;
  action: Action;
  company: Company;
  user: { userId: number };
  fields: {
    [code: string]: {
      id: number;
      title: string;
      contactPerson: string;
      tell: string;
      email: string;
    };
  };
};

type RemoteDepartment = {
  id: number;
  action: Action;
  company: Company;
  user: { userId: number };
  translationDepartments: Array<{
    id: number;
    code: string;
    title: string;
    contactPerson: string;
    tell: string;
    email: string;
  }>;
};

type DepartmentsState = {
  departments: Department[];
  status: SliceStatuses;
  error: string | null;
};

type CreateDepartmentParams = Omit<
  RemoteDepartment,
  'id' | 'user' | 'action' | 'company' | 'translationDepartments'
> & {
  action: number;
  company: number;
  translate: Array<{
    code: string;
    title: string;
    contactPerson: string;
    tell: string;
    email: string;
  }>;
};

export type { Department, DepartmentsState, CreateDepartmentParams, RemoteDepartment };
