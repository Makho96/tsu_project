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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  companyId: number | null;
};

export { FormFields };
export type { FormValues, CompanyModalProps };
