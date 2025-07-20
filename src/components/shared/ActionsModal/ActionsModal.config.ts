import { object, string } from 'yup';
import { FormFields, FormValues, Colors } from './ActionsModal.types';
import { Statuses } from '../../../store/actions/actions.types';

const initialValues: FormValues = {
  [FormFields.title]: '',
  [FormFields.status]: Statuses.DRAFT,
  [FormFields.color]: Colors.Coral,
  [FormFields.description]: '',
};

const createValidationSchema = (keys: string[]) => {
  const schema: Record<string, any> = object({
    [FormFields.status]: string()
      .required('Status is required')
      .oneOf(Object.values(Statuses), 'Invalid status value'),
    [FormFields.color]: string().required('Color is required'),
  });

  keys.forEach((key) => {
    schema[key] = object({
      [FormFields.title]: string().required('Title is required'),
      [FormFields.description]: string().optional(),
    });
  });

  return object(schema);
};

const validationSchema = object({
  [FormFields.title]: string().required('Title is required'),
  [FormFields.status]: string()
    .required('Status is required')
    .oneOf(Object.values(Statuses), 'Invalid status value'),
  [FormFields.color]: string().required('Color is required'),
  [FormFields.description]: string(),
});

export { initialValues, validationSchema, createValidationSchema };
