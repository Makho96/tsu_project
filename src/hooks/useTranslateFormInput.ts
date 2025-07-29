import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FormInputData } from '../store/actionForm/actionsForm.types';

const useTranslateFormInput = (input: FormInputData) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const fallbackLanguage = i18n.options.fallbackLng as string;
  const inputFields = useMemo(() => {
    return input.fields[currentLanguage] || input.fields[fallbackLanguage];
  }, [input.fields, currentLanguage, fallbackLanguage]);

  return { inputFields };
};

export { useTranslateFormInput };
