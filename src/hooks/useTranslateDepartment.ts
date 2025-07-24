import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Department } from '../store/departments';

const useTranslateDepartment = (department: Department) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const fallbackLanguage = i18n.options.fallbackLng as string;

  const departmentFields = useMemo(() => {
    return department.fields[currentLanguage] || department.fields[fallbackLanguage];
  }, [department.fields, currentLanguage, fallbackLanguage]);

  return { departmentFields };
};

export { useTranslateDepartment };
