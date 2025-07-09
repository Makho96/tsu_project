import { Box, CircularProgress } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import DepartmentCard from './DepartmentCard';
import { getDepartments } from '../../../store/departments/departments.thunks';
import { Department } from '../../../store/departments/departments.types';
import { useAppSelector, useAppDispatch } from '../../../store/hooks/useTypedSelector';
import { SliceStatuses } from '../../../store/types';

type DepartmentsListProps = {
  departments: Department[];
};

const DepartmentsList = ({ departments }: DepartmentsListProps) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.departments);
  const params = useParams();
  const actionId = useMemo(() => Number(params.actionId), [params.actionId]);

  useEffect(() => {
    dispatch(getDepartments(actionId));
  }, [dispatch, actionId]);

  if (status === SliceStatuses.LOADING) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </Box>
  );
};

export default DepartmentsList;
