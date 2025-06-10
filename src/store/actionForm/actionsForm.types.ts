import { Action } from "../actions/actions.types";
import { Department } from "../departments/departments.types";
import { SliceStatuses } from "../types";

enum FormFieldTypes {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
}

type FormInputData = {
  id: number;
  action: Action;
  name: string;
  description: string;
  legalName: string;
  type: FormFieldTypes;
  requirement: boolean;
  hidden: boolean;
  department: Department;
  key: string;
};

type ActionFormState = {
  formInputs: FormInputData[];
  status: SliceStatuses;
  error: string | null;
};

type CreateFormInputParams = {
  action: number;
  description: string;
  key: string;
  type: FormFieldTypes;
  name: string;
  requirement: boolean;
  hidden: boolean;
  legalName: string;
};

type DeleteFormInputParams = {
  id: number;
  actionId: number;
};

export { FormFieldTypes };

export type {
  ActionFormState,
  FormInputData,
  CreateFormInputParams,
  DeleteFormInputParams,
};
