import { SliceStatuses } from '../types';

enum Statuses {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  ARCHIVED = 'ARCHIVED',
}

enum Colors {
  Coral = '#FF6B35',
  Teal = '#00A693',
  Blue = '#4A90E2',
  Purple = '#9B59B6',
  Orange = '#E67E22',
  Green = '#2ECC71',
  Red = '#E74C3C',
  Navy = '#34495E',
  Emerald = '#16A085',
  Violet = '#8E44AD',
}

type Action = {
  id: number;
  company: {
    id: number;
  };
  color: Colors;
  user: { userId: number };
  status: Statuses;
  translationActions: Array<{
    code: string;
    title: string;
    description: string;
  }>;
};

type ActionsState = {
  actions: ClientAction[];
  status: SliceStatuses;
  error: string | null;
};

type CreateActionParams = {
  company: number;
  color: Colors;
  status: Statuses;
  translate: Array<{
    code: string;
    title: string;
    description: string;
  }>;
};

type ClientAction = {
  id: number;
  company: {
    id: number;
  };
  color: Colors;
  user: { userId: number };
  status: Statuses;
  fields: {
    [code: string]: {
      title: string;
      description: string;
    };
  };
};

export { Statuses, Colors };

export type { Action, ActionsState, CreateActionParams, ClientAction };
