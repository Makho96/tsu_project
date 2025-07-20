import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClientAction } from '../store/actions/actions.types';

const useTranslateActions = (action: ClientAction) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const fallbackLanguage = i18n.options.fallbackLng as string;

  const actionFields = useMemo(() => {
    return action.fields[currentLanguage] || action.fields[fallbackLanguage];
  }, [action.fields, currentLanguage, fallbackLanguage]);

  return { actionFields };
};

export { useTranslateActions };
