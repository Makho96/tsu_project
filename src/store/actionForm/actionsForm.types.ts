import { ClientAction } from '../actions/actions.types';
import { Department } from '../departments/departments.types';
import { SliceStatuses } from '../types';

enum FormFieldTypes {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
}

type RemoteFormInput = {
  id: number;
  action: ClientAction;
  type: FormFieldTypes;
  requirement: boolean;
  hidden: boolean;
  department: Department;
  key: string;
  translation: Array<{
    id: number;
    text: string;
    description: string;
    legalText: string;
  }>;
};

type FormInputData = {
  id: number;
  action: ClientAction;
  type: FormFieldTypes;
  requirement: boolean;
  hidden: boolean;
  department: Department;
  key: string;
  fields: {
    [code: string]: {
      id: number;
      text: string;
      description: string;
      legalName: string;
    };
  };
};

type ActionFormState = {
  formInputs: FormInputData[];
  status: SliceStatuses;
  error: string | null;
};

type CreateFormInputParams = {
  action: number;
  key: string;
  type: FormFieldTypes;
  requirement: boolean;
  hidden: boolean;
  translate: Array<{
    text: string;
    description: string;
    legalText: string;
  }>;
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
  RemoteFormInput,
};
