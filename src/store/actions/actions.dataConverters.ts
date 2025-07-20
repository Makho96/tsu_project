import _keyBy from 'lodash/keyBy';
import { Action, ClientAction } from './actions.types';

const toClientAction = (action: Action): ClientAction => {
  return {
    id: action.id,
    company: action.company,
    color: action.color,
    user: action.user,
    status: action.status,
    fields: _keyBy(action.translationActions, 'code'),
  };
};

export { toClientAction };
