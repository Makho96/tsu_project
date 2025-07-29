import { object, string, boolean } from 'yup';
import { FormFields, FormValues } from './ActionFormModal.types';
import { FormFieldTypes } from '../../../store/actionForm/actionsForm.types';

const initialValues: FormValues = {
  [FormFields.name]: '',
  [FormFields.description]: '',
  [FormFields.legalName]: '',
  [FormFields.type]: FormFieldTypes.TEXT,
  [FormFields.requirement]: false,
  [FormFields.hidden]: false,
  [FormFields.key]: '',
};

const createValidationSchema = (keys: string[]) => {
  const schemaShape: Record<string, any> = {
    [FormFields.type]: string().required('Type is required'),
    [FormFields.requirement]: boolean().required('Requirement is required'),
    [FormFields.hidden]: boolean().required('Hidden is required'),
  };

  keys.forEach((key) => {
    schemaShape[key] = object({
      [FormFields.name]: string().required('Name is required'),
      [FormFields.description]: string().required('Description is required'),
      [FormFields.legalName]: string().required('Legal name is required'),
    });
  });

  return object(schemaShape);
};

const validationSchema = object({
  [FormFields.name]: string().required('Name is required'),
  [FormFields.description]: string().required('Description is required'),
  [FormFields.legalName]: string().required('Legal name is required'),
  [FormFields.type]: string().required('Type is required'),
  [FormFields.requirement]: boolean().required('Requirement is required'),
  [FormFields.hidden]: boolean().required('Hidden is required'),
});

export { initialValues, validationSchema, createValidationSchema };
