import { FormFieldTypes } from '../../../store/actionForm/actionsForm.types';

export type ModalInputData = {
  inputKey: string;
  inputName: string;
  inputType: FormFieldTypes;
  inputValue: string;
  id?: number;
};

type RecordingsModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  formInputs: ModalInputData[];
};

export default RecordingsModalProps;
