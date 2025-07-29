import _keyBy from 'lodash/keyBy';
import { RemoteFormInput, FormInputData } from './actionsForm.types';

const toClientActionFrom = (remoteFormInput: RemoteFormInput): FormInputData => {
  return {
    id: remoteFormInput.id,
    action: remoteFormInput.action,
    type: remoteFormInput.type,
    requirement: remoteFormInput.requirement,
    hidden: remoteFormInput.hidden,
    key: remoteFormInput.key,
    department: remoteFormInput.department,
    fields: _keyBy(
      remoteFormInput.translation.map((form) => ({
        ...form,
        legalName: form.legalText, // Map legalText to legalName
      })),
      'code'
    ),
  };
};

export { toClientActionFrom };
