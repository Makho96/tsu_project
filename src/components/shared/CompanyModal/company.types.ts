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
  companyId: number | null;
  initialData?: FormValues;
};

export { FormFields };
export type { FormValues, CompanyModalProps };
