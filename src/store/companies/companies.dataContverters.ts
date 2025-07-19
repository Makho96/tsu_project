import _keyBy from 'lodash/keyBy';
import { CompanyData, RemoteCompany } from './companies.types';

const toClientCompany = (company: RemoteCompany): CompanyData => {
  return {
    id: company.id,
    user: company.user,
    fields: _keyBy(company.translationCompanies, 'code'),
  };
};

export { toClientCompany };
