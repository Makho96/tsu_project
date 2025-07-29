import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createValidationSchema, initialValues } from './ActionFormModal.config';
import { ActionFormModalProps, FormFields, FormData } from './ActionFormModal.types';
import useEvent from '../../../hooks/useEvent';
import { createFormInput, updateFormInput } from '../../../store/actionForm/actionsForm.thunks';
import { FormFieldTypes } from '../../../store/actionForm/actionsForm.types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useTypedSelector';
import { generateRandomString } from '../../../utils/randomString';
import FormCheckbox from '../FormCheckbox/FormCheckbox';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import ConfirmModal from '../Modals/Confirm/Confirm';
import Tabs from '../Tabs';

const ActionFormModal = ({ initialData, onClose, actionId }: ActionFormModalProps) => {
  const languages = useAppSelector((state) => state.languages.languages);
  const { t } = useTranslation();
  const closeModal = useCallback(() => onClose(), [onClose]);
  const dispatch = useAppDispatch();

  const initialFormValues = useMemo(() => {
    if (initialData) {
      const initialFormValues = {
        [FormFields.type]: initialData.type,
        [FormFields.requirement]: !!initialData.requirement,
        [FormFields.hidden]: !!initialData.hidden,
        [FormFields.key]: initialData.key,
      } as FormData;

      languages.map((language) => {
        initialFormValues[language.isoCode] = {
          [FormFields.name]: initialData.fields[language.isoCode]?.text,
          [FormFields.description]: initialData.fields[language.isoCode]?.description,
          [FormFields.legalName]: initialData.fields[language.isoCode]?.legalName,
        };
      });

      return initialFormValues;
    }

    const initialFormValues = {
      [FormFields.type]: initialValues[FormFields.type],
      [FormFields.requirement]: initialValues[FormFields.requirement],
      [FormFields.hidden]: initialValues[FormFields.hidden],
      [FormFields.key]: initialValues[FormFields.key],
    } as FormData;

    languages.map((language) => {
      initialFormValues[language.isoCode] = {
        [FormFields.name]: initialValues[FormFields.name],
        [FormFields.description]: initialValues[FormFields.description],
        [FormFields.legalName]: initialValues[FormFields.legalName],
      };
    });

    return initialFormValues;
  }, [initialData, languages]);

  const handleSubmit = useEvent(async (values: FormData) => {
    const params = {
      type: values[FormFields.type],
      requirement: values[FormFields.requirement],
      hidden: values[FormFields.hidden],
      key: initialData ? initialData.key : generateRandomString(),
      action: actionId,
      translate: languages.map((language) => ({
        code: language.isoCode,
        id: initialData?.fields[language.isoCode]?.id,
        text: values[language.isoCode][FormFields.name],
        description: values[language.isoCode][FormFields.description],
        legalText: values[language.isoCode][FormFields.legalName],
      })),
    };

    if (initialData) {
      return await dispatch(updateFormInput({ ...params, id: initialData.id })).then(closeModal);
    }

    return await dispatch(createFormInput(params)).then(closeModal);
  });

  const typeOptions = useMemo(() => {
    return Object.values(FormFieldTypes).map((type) => ({
      value: type,
      label: t(`pages.actionFormModal.${type}`),
    }));
  }, [t]);

  return (
    <ConfirmModal
      onClose={closeModal}
      title={t('pages.actionFormModal.title')}
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialFormValues}
          validationSchema={createValidationSchema(languages.map((language) => language.isoCode))}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form style={{ minWidth: '400px' }} onSubmit={handleSubmit}>
              <Tabs
                tabs={languages.map((language, index) => ({
                  id: index,
                  label: t(`languages.${language.isoCode}`),
                  element: (
                    <>
                      <Box sx={{ marginBottom: 2 }}>
                        <FormInput
                          name={`${language.isoCode}[${FormFields.name}]`}
                          label={t('pages.actionFormModal.name')}
                        />
                      </Box>
                      <Box sx={{ marginBottom: 2 }}>
                        <FormInput
                          name={`${language.isoCode}[${FormFields.description}]`}
                          label={t('pages.actionFormModal.description')}
                        />
                      </Box>
                      <Box sx={{ marginBottom: 2 }}>
                        <FormInput
                          name={`${language.isoCode}[${FormFields.legalName}]`}
                          label={t('pages.actionFormModal.legalName')}
                        />
                      </Box>
                    </>
                  ),
                }))}
              />
              <Box sx={{ marginBottom: 2 }}>
                <FormSelect
                  name={FormFields.type}
                  label={t('pages.actionFormModal.type')}
                  options={typeOptions}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormCheckbox
                  name={FormFields.requirement}
                  label={t('pages.actionFormModal.requirement')}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormCheckbox name={FormFields.hidden} label={t('pages.actionFormModal.hidden')} />
              </Box>

              <Box display="flex" gap={2} justifyContent="flex-end" marginTop={2}>
                <Button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{ padding: '8px 12px', minWidth: '110px' }}
                  variant="outlined"
                  startIcon={<ClearOutlinedIcon sx={{ color: 'common.white' }} />}
                >
                  {t('pages.actionFormModal.cancel')}
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
                  {initialData
                    ? t('pages.actionFormModal.edit')
                    : t('pages.actionFormModal.create')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default ActionFormModal;
