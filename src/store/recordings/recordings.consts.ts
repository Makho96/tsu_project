import { RecordingsInitialState } from './recordings.types';
import { SliceStatuses } from '../types';

const initialState: RecordingsInitialState = {
  recordings: [],
  status: SliceStatuses.IDLE,
  error: null,
};

export { initialState };
