import { Action, Statuses } from "../../../store/actions/actions.types";

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
  [FormFields.color]: string;
  [FormFields.description]: string;
};

export { FormFields };

export type { ActionsModalProps, FormValues };
