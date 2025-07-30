import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ConfirmModal } from '../Modals';
import RecordingsModalProps, { FormData, FormValues } from './RecordingsModal.types';
import useEvent from '../../../hooks/useEvent';
import { FormFieldTypes } from '../../../store/actionForm/actionsForm.types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useTypedSelector';
import { saveRecordings } from '../../../store/recordings/recordings.thunks';
import { updateRecordings } from '../../../store/recordings/recordings.thunks';
import { RecrordingDetails } from '../../../store/recordings/recordings.types';
import FormInput from '../FormInput/FormInput';
import Tabs from '../Tabs';

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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const params = useParams();

  const departmentId = useMemo(() => Number(params.departmentId), [params.departmentId]);

  const initialFormValues = useMemo(() => {
    const formValues: FormData = {};
    languages.forEach((language) => {
      const languageValues: FormValues = {};
      formInputs.forEach((input) => {
        languageValues[input.inputKey] = getDefaultValue(input.inputType, input.inputValue);
      });
      formValues[language.isoCode] = languageValues;
    });
    console.log(formValues);
    return formValues;
  }, [formInputs, languages]);

  console.log(initialFormValues);

  const handleSubmit = useEvent((values: FormData) => {
    debugger;
    if (!isEdit) {
      const recordings: RecrordingDetails[] = [];
      Object.entries(values).forEach(([key, value]) => {
        formInputs.forEach((input) =>
          recordings.push({
            code: key,
            formKey: input.inputKey,
            formName: input.inputName,
            inputValue: value[input.inputKey],
            inputType: input.inputType,
          })
        );
      });

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
              <Tabs
                tabs={languages.map((language, index) => {
                  return {
                    id: index,
                    label: t(`languages.${language.isoCode}`),
                    element: (
                      <Box>
                        {formInputs.map((input) => (
                          <Box key={input.inputKey} sx={{ marginBottom: 2 }}>
                            <FormInput
                              name={`${language.isoCode}[${input.inputKey}]`}
                              label={input.inputName}
                              type={input.inputType}
                            />
                          </Box>
                        ))}
                      </Box>
                    ),
                  };
                })}
              />
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
