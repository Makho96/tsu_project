import { FormFieldTypes } from '../actionForm/actionsForm.types';
import { SliceStatuses } from '../types';

type SaveRecordingsParams = {
  department: number;
  details: RecrordingDetails[];
};

type RecrordingDetails = {
  formKey: string;
  formName: string;
  inputValue: string;
  inputType: FormFieldTypes;
};

type Recordings = RecrordingDetails & {
  id: number;
};

type RecordingsInitialState = {
  recordings: {
    id: number;
    data: Record<string, Recordings>;
  }[];
  status: SliceStatuses;
  error: string | null;
};

export type { SaveRecordingsParams, Recordings, RecordingsInitialState };
