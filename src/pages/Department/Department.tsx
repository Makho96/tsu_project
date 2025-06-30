import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/shared/Loader';
import RecordingList from '../../components/shared/RecordingList/RecordingList';
import RecordingsModal from '../../components/shared/RecordingsModal/RecordingsModal';
import useEvent from '../../hooks/useEvent';
import { getFormData } from '../../store/actionForm/actionsForm.thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useTypedSelector';
import { getRecordings } from '../../store/recordings/recordings.thunks';
import { SliceStatuses } from '../../store/types';

const Department = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const formInputs = useAppSelector((state) => state.actionsForm.formInputs);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transformedFormInputs = useMemo(() => {
    return formInputs.map((input) => ({
      inputKey: input.key,
      inputName: input.name,
      inputType: input.type,
      inputValue: '',
    }));
  }, [formInputs]);

  const isFormInputsLoading = useAppSelector(
    (state) =>
      state.actionsForm.status === SliceStatuses.LOADING ||
      state.actionsForm.status === SliceStatuses.IDLE
  );

  const actionId = useMemo(() => Number(params.actionId), [params.actionId]);

  const departmentId = useMemo(() => Number(params.departmentId), [params.departmentId]);

  const fetchFormData = useEvent(async () => {
    dispatch(getFormData(actionId));
    dispatch(getRecordings(departmentId));
  });

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  return (
    <Box>
      {isFormInputsLoading ? (
        <Loader />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: 'green.1000',
              padding: '8px 16px',
              fontSize: '12px',
            }}
            startIcon={<AddOutlinedIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            {t('pages.department.newRecord')}
          </Button>
          <RecordingList departmentId={departmentId} />
        </>
      )}
      {isModalOpen && (
        <RecordingsModal setIsOpen={setIsModalOpen} formInputs={transformedFormInputs} />
      )}
    </Box>
  );
};

export default Department;
