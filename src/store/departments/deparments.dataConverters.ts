import _keyBy from 'lodash/keyBy';
import { Department, RemoteDepartment } from './departments.types';

const toClientDepartment = (data: RemoteDepartment): Department => {
  console.log(data);
  return {
    ...data,
    fields: _keyBy(data.translationDepartments, 'code'),
  };
};

export { toClientDepartment };
