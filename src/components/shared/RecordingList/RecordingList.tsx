import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import RecordingItem from './RecordingItem';
import RecordingsTable from './RecordingsTable';
import { useAppSelector } from '../../../store/hooks/useTypedSelector';
import { SliceStatuses } from '../../../store/types';
import CustomGrid, { ColumnDef } from '../../CustomGrid/CustomGrid';
import Loader from '../Loader/Loader';

type RecordingListProps = {
  departmentId: number;
};

const RecordingList = ({ departmentId }: RecordingListProps) => {
  const recordings = useAppSelector((state) => state.recordings.recordings);
  const [columns, setColumns] = useState<ColumnDef[]>([]);

  const isLoading = useAppSelector(
    (state) =>
      state.recordings.status === SliceStatuses.LOADING ||
      state.recordings.status === SliceStatuses.IDLE
  );

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ marginTop: '20px' }}>
      {recordings.length > 0 ? (
        <RecordingsTable recordings={recordings} />
      ) : (
        <Typography variant="h6">No recordings found</Typography>
      )}
    </Box>
  );
};

export default RecordingList;
