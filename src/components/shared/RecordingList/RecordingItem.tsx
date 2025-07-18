import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks/useTypedSelector';
import { deleteRecording, saveRecordings } from '../../../store/recordings/recordings.thunks';
import { Recordings } from '../../../store/recordings/recordings.types';
import { ConfirmModal } from '../Modals';
import RecordingsModal from '../RecordingsModal/RecordingsModal';
import { ModalInputData } from '../RecordingsModal/RecordingsModal.types';

type RecordingItemProps = {
  recording: {
    id: number;
    data: Record<string, Recordings>;
  };
  departmentId: number;
};

enum ModalTypes {
  Edit = 'edit',
  Delete = 'delete',
  Copy = 'copy',
}

const RecordingItem = ({ recording, departmentId }: RecordingItemProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [modalData, setModalData] = useState<ModalInputData[] | null>(null);

  const handleDeleteRecording = useCallback(async () => {
    await dispatch(deleteRecording({ ids: [recording.id], departmentId }));
    setModalType(null);
  }, [recording.id, departmentId, dispatch]);

  const openRecordingsEditModal = useCallback(() => {
    const transformedInputs = Object.entries(recording.data).map(([key, value]) => {
      return {
        inputKey: key,
        inputName: value.formName,
        inputType: value.inputType,
        inputValue: value.inputValue,
        id: value.id,
      };
    });
    setModalType(ModalTypes.Edit);
    setModalData(transformedInputs);
  }, [recording.data]);

  const handleCopyRecording = useCallback(() => {
    const transformedInputs = Object.entries(recording.data).map(([key, value]) => {
      return {
        formKey: key,
        formName: value.formName,
        inputType: value.inputType,
        inputValue: value.inputValue,
      };
    });
    dispatch(saveRecordings({ department: departmentId, details: transformedInputs }));
    setModalType(null);
  }, [recording.data, departmentId, dispatch]);

  return (
    <>
      <Box key={recording.id} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography variant="body1">{recording.data.dasda.inputValue}</Typography>
        <Typography variant="body1">{recording.data.das.inputValue}</Typography>
        <Typography variant="body1">{recording.data['თარიღი'].inputValue}</Typography>
        <button onClick={openRecordingsEditModal}>edit</button>
        <button onClick={() => setModalType(ModalTypes.Delete)}>delete</button>
        <button onClick={() => setModalType(ModalTypes.Copy)}>copy</button>
      </Box>
      {modalType === ModalTypes.Delete && (
        <ConfirmModal
          title={t('pages.recordings.deleteRecord')}
          modalBody={t('pages.recordings.deleteConfirmation')}
          confirmButtonText={t('pages.recordings.delete')}
          cancelButtonText={t('pages.recordings.cancel')}
          onClose={() => setModalType(null)}
          onConfirm={handleDeleteRecording}
        />
      )}
      {modalType === ModalTypes.Edit && modalData && (
        <RecordingsModal setIsOpen={() => setModalType(null)} formInputs={modalData} />
      )}
      {modalType === ModalTypes.Copy && (
        <ConfirmModal
          title={t('pages.recordings.copyRecord')}
          modalBody={t('pages.recordings.copyConfirmation')}
          confirmButtonText={t('pages.recordings.copy')}
          cancelButtonText={t('pages.recordings.cancel')}
          onClose={() => setModalType(null)}
          onConfirm={handleCopyRecording}
        />
      )}
    </>
  );
};

export default RecordingItem;
