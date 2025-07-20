import { User } from '../auth/auth.types';
import { SliceStatuses } from '../types';

type Company = {
  id: number;
  title: string;
  user: User;
  email: string;
  tell: string;
  address?: string;
};

type CompaniesInitialState = {
  currentCompany: CompanyData | null;
  companies: CompanyData[];
  status: SliceStatuses;
  error: string | null;
};

type CreateCompanyParams = (Omit<Company, 'id' | 'user'> & {
  code: string;
})[];

type UpdateCompanyParams = {
  id: number;
  translationCompanies: Array<{
    code: string;
    title: string;
    email: string;
    tell: string;
    address: string;
  }>;
};

type CompanyData = {
  id: number;
  user: User;
  fields: {
    [code: string]: {
      title: string;
      email: string;
      tell: string;
      address: string;
    };
  };
};

type RemoteCompany = {
  id: number;
  user: User;
  translationCompanies: Array<{
    title: string;
    address: string;
    code: string;
    tell: string;
    email: string;
  }>;
};

export type {
  Company,
  CompaniesInitialState,
  CreateCompanyParams,
  CompanyData,
  RemoteCompany,
  UpdateCompanyParams,
};
