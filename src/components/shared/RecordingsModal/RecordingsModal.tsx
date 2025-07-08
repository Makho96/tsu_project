import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ConfirmModal } from '../Modals';
import RecordingsModalProps from './RecordingsModal.types';
import useEvent from '../../../hooks/useEvent';
import { FormFieldTypes } from '../../../store/actionForm/actionsForm.types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useTypedSelector';
import { saveRecordings } from '../../../store/recordings/recordings.thunks';
import { updateRecordings } from '../../../store/recordings/recordings.thunks';
import FormInput from '../FormInput/FormInput';

const getDefaultValue = (inputType: string | number | Date, inputValue: string) => {
  if (inputType === FormFieldTypes.TEXT) {
    return inputValue || '';
  }
  if (inputType === FormFieldTypes.NUMBER) {
    return inputValue || (0 as number);
  }
  if (inputType === FormFieldTypes.DATE) {
    return inputValue || new Date().toString();
  }

  return '';
};

const RecordingsModal = ({ setIsOpen, formInputs, isEdit = false }: RecordingsModalProps) => {
  const languages = useAppSelector((state) => state.languages.languages);
  console.log(languages);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const params = useParams();

  const departmentId = useMemo(() => Number(params.departmentId), [params.departmentId]);

  const initialFormValues = useMemo(() => {
    const formValues: Record<string, any> = {};

    formInputs.forEach((input) => {
      formValues[input.inputKey] = getDefaultValue(input.inputType, input.inputValue);
    });
    return formValues;
  }, [formInputs]);

  const handleSubmit = useEvent((values: Record<string, string>) => {
    if (!isEdit) {
      const recordings = formInputs.map((input) => ({
        formKey: input.inputKey,
        formName: input.inputName,
        inputValue: values[input.inputKey],
        inputType: input.inputType,
      }));
      return dispatch(saveRecordings({ department: departmentId, details: recordings })).then(
        () => {
          setIsOpen(false);
        }
      );
    }

    const recordings = formInputs.map((input) => ({
      formKey: input.inputKey,
      formName: input.inputName,
      inputValue: values[input.inputKey],
      inputType: input.inputType,
      id: input.id!,
    }));
    return dispatch(
      updateRecordings({
        department: departmentId,
        id: formInputs[0].formResultId!,
        details: recordings,
      })
    ).then(() => {
      setIsOpen(false);
    });
  });

  return (
    <ConfirmModal
      title={isEdit ? t('pages.department.editRecord') : t('pages.department.newRecord')}
      onClose={() => setIsOpen(false)}
      onConfirm={() => {}}
      onCancel={() => setIsOpen(false)}
      showButtons={false}
      modalBody={
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ minWidth: '400px' }}>
              {formInputs.map((input) => (
                <Box key={input.inputKey} sx={{ marginBottom: 2 }}>
                  <FormInput name={input.inputKey} label={input.inputName} type={input.inputType} />
                </Box>
              ))}
              <Box display="flex" gap={2} justifyContent="flex-end" marginTop={2}>
                <Button
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{ padding: '8px 12px', minWidth: '110px' }}
                  variant="outlined"
                  startIcon={<ClearOutlinedIcon sx={{ color: 'common.white' }} />}
                >
                  {t('pages.actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{
                    bgcolor: 'green.1000',
                    padding: '8px 12px',
                    minWidth: '110px',
                  }}
                  startIcon={<CheckOutlinedIcon sx={{ color: 'common.white' }} />}
                >
                  {isEdit ? t('pages.department.editRecord') : t('pages.department.createRecord')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    ></ConfirmModal>
  );
};

export default RecordingsModal;
