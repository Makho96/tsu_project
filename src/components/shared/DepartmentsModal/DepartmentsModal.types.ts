import { Department } from "../../../store/departments";

type DepartmentsModalProps = {
  initialData?: Department;
  setIsOpen: (isOpen: boolean) => void;
};

enum FormFields {
  title = "title",
  contactPerson = "contactPerson",
  tell = "tell",
  eMail = "eMail",
}

type FormValues = {
  [FormFields.title]: string;
  [FormFields.contactPerson]: string;
  [FormFields.tell]: string;
  [FormFields.eMail]: string;
};

export { FormFields };

export type { DepartmentsModalProps, FormValues };
