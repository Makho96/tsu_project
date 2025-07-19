import { CompanyData } from '../../../store/companies/companies.types';

enum FormFields {
  Name = 'name',
  Email = 'email',
  Phone = 'phone',
  Address = 'address',
}

type FormValues = {
  [FormFields.Name]: string;
  [FormFields.Email]: string;
  [FormFields.Phone]: string;
  [FormFields.Address]: string;
};

type CompanyModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  initialData?: CompanyData;
};

type FormData = Record<string, FormValues>;

export { FormFields };
export type { FormValues, CompanyModalProps, FormData };
