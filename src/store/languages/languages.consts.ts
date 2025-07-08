import { SliceStatuses } from '../types';
import { LanguagesInitialState } from './languages.types';

const initialState: LanguagesInitialState = {
  languages: [],
  status: SliceStatuses.IDLE,
  error: null,
};

export { initialState };
