import { Action, Colors, Statuses } from "../../../store/actions/actions.types";

type ActionsModalProps = {
  initialData?: Action;
  setIsOpen: (isOpen: boolean) => void;
};

enum FormFields {
  title = "title",
  status = "status",
  color = "color",
  description = "description",
}

type FormValues = {
  [FormFields.title]: string;
  [FormFields.status]: Statuses;
  [FormFields.color]: Colors;
  [FormFields.description]: string;
};

export { FormFields, Colors };

export type { ActionsModalProps, FormValues };
