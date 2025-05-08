import { Company } from "../../../store/companies/companies.types";

enum FormFields {
  Name = "name",
  Email = "email",
  Phone = "phone",
}

type FormValues = {
  [FormFields.Name]: string;
  [FormFields.Email]: string;
  [FormFields.Phone]: string;
};

type CompanyModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  initialData?: Company;
};

export { FormFields };
export type { FormValues, CompanyModalProps };
