import { SliceStatuses } from '../types';

enum Languages {
  English = 'en',
  Georgian = 'ge',
}

type Language = {
  id: number;
  name: string;
  isoCode: Languages;
  isoCode3: Languages;
  active: boolean;
};

type LanguagesInitialState = {
  languages: Language[];
  status: SliceStatuses;
  error: string | null;
};

export type { Language, LanguagesInitialState };

export { Languages };
