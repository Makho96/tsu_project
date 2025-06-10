import {
  FormInputData,
  FormFieldTypes,
} from "../../../store/actionForm/actionsForm.types";

type ActionFormModalProps = {
  onClose: () => void;
  initialData?: FormInputData;
  actionId: number;
};

enum FormFields {
  name = "name",
  description = "description",
  legalName = "legalName",
  type = "type",
  requirement = "requirement",
  hidden = "hidden",
  key = "key",
}

type FormValues = {
  [FormFields.name]: string;
  [FormFields.description]: string;
  [FormFields.legalName]: string;
  [FormFields.type]: FormFieldTypes;
  [FormFields.requirement]: boolean;
  [FormFields.hidden]: boolean;
  [FormFields.key]: string;
};

export { FormFields };

export type { ActionFormModalProps, FormValues };
