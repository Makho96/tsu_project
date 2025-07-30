import { FormFieldTypes } from '../../../store/actionForm/actionsForm.types';

export type ModalInputData = {
  inputKey: string;
  inputName: string;
  inputType: FormFieldTypes;
  inputValue: string;
  id?: number;
  formResultId?: number;
};

type RecordingsModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  formInputs: ModalInputData[];
  isEdit?: boolean;
};

type FormValues = {
  [key: string]: any;
};

type FormData = Record<string, FormValues>;

export default RecordingsModalProps;

export type { FormData, FormValues };
