import { object, string } from 'yup';
import { FormFields, FormValues } from './company.types';

const initialValues: FormValues = {
  [FormFields.Name]: '',
  [FormFields.Email]: '',
  [FormFields.Phone]: '',
  [FormFields.Address]: '',
};

const createValidationSchema = (keys: string[]) => {
  const schema: Record<string, any> = {};

  keys.forEach((key) => {
    schema[key] = object({
      [FormFields.Name]: string().required('Name is required'),
      [FormFields.Email]: string().email('Invalid email').required('Email is required'),
      [FormFields.Phone]: string().required('Phone is required'),
      [FormFields.Address]: string().required('Address is required'),
    });
  });

  return object(schema);
};

const validationSchema = object({
  [FormFields.Name]: string().required('Name is required'),
  [FormFields.Email]: string().email('Invalid email').required('Email is required'),
  [FormFields.Phone]: string().required('Phone is required'),
  [FormFields.Address]: string().required('Address is required'),
});

export { initialValues, validationSchema, createValidationSchema };
