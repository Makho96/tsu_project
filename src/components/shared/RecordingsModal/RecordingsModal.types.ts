import { FormInputData } from "../../../store/actionForm/actionsForm.types";

type RecordingsModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  formInputs: FormInputData[];
};

export default RecordingsModalProps;
