import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { initialValues, createValidationSchema } from './ActionsModal.config';
import { Colors, FormFields, type FormData, type ActionsModalProps } from './ActionsModal.types';
import useEvent from '../../../hooks/useEvent';
import { createAction, updateAction } from '../../../store/actions/actions.thunks';
import { Statuses } from '../../../store/actions/actions.types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useTypedSelector';
import FormInput from '../FormInput/FormInput';
import FormSelect from '../FormSelect/FormSelect';
import { ConfirmModal } from '../Modals';
import ColorPicker from './ColorPicker';
import Tabs from '../Tabs';

const ActionsModal = ({ initialData, setIsOpen }: ActionsModalProps) => {
  const languages = useAppSelector((state) => state.languages.languages);
  const { t } = useTranslation();
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const dispatch = useAppDispatch();
  const currentCompany = useAppSelector((state) => state.companies.currentCompany!);

  const initialFormValues = useMemo(() => {
    if (initialData) {
      const initialFormValues = {
        [FormFields.color]: initialData.color,
        [FormFields.status]: initialData.status,
      } as FormData;

      languages.map((language) => {
        initialFormValues[language.isoCode] = {
          [FormFields.title]: initialData.fields[language.isoCode]?.title,
          [FormFields.description]: initialData.fields[language.isoCode]?.description,
        };
      });

      return initialFormValues;
    }
    const initialFormValues = {
      [FormFields.color]: initialValues[FormFields.color],
      [FormFields.status]: initialValues[FormFields.status],
    } as FormData;

    languages.map((language) => {
      initialFormValues[language.isoCode] = {
        [FormFields.title]: initialValues[FormFields.title],
        [FormFields.description]: initialValues[FormFields.description],
      };
    });

    return initialFormValues;
  }, [languages, initialData]);

  const handleSubmit = useEvent(async (values: FormData) => {
    const params = {
      company: currentCompany.id,
      status: values[FormFields.status] as Statuses,
      color: values[FormFields.color] as unknown as Colors,
      translate: languages.map((language) => {
        return {
          code: language.isoCode,
          title: values[language.isoCode][FormFields.title],
          description: values[language.isoCode][FormFields.description],
        };
      }),
    };

    const apiCall = initialData
      ? updateAction({
          ...params,
          id: initialData.id,
          company: currentCompany.id,
        })
      : createAction(params);

    return await dispatch(apiCall).then(closeModal);
  });

  const statusOptions = useMemo(
    () =>
      Object.values(Statuses).map((status) => ({
        value: status,
        label: t(`pages.actions.${status.toLowerCase()}`),
      })),
    [t]
  );

  return (
    <ConfirmModal
      onClose={closeModal}
      title={initialData ? t('pages.actions.editAction') : t('pages.actions.addAction')}
      confirmButtonText={initialData ? t('pages.actions.edit') : t('pages.actions.create')}
      cancelButtonText={t('pages.actions.cancel')}
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialFormValues}
          validationSchema={createValidationSchema(languages.map((language) => language.isoCode))}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setValues, values }) => (
            <Form style={{ minWidth: '400px' }}>
              <Tabs
                tabs={languages.map((language, index) => {
                  return {
                    id: index,
                    label: t(`languages.${language.isoCode}`),
                    element: (
                      <>
                        <Box sx={{ marginBottom: 2 }}>
                          <FormInput
                            name={`${language.isoCode}[${FormFields.title}]`}
                            label={t('pages.actions.title')}
                          />
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                          <FormInput
                            name={`${language.isoCode}[${FormFields.description}]`}
                            label={t('pages.actions.description')}
                          />
                        </Box>
                      </>
                    ),
                  };
                })}
                panelStyle={{ paddingInline: '0px', paddingBottom: '0px' }}
              />
              <hr style={{ marginBlock: '30px' }} />
              <Box sx={{ marginBottom: 2 }}>
                <FormSelect
                  name={`${FormFields.status}`}
                  label={t('pages.actions.status')}
                  options={statusOptions}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 1,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <PaletteOutlinedIcon sx={{ marginRight: 1, fontSize: '18px' }} />
                  {t('pages.actions.color')}
                </Typography>
                <ColorPicker
                  onChange={(color: Colors) => {
                    setValues({
                      ...values,
                      [FormFields.color]: color,
                    } as FormData);
                  }}
                  chosenColor={values[FormFields.color] as Colors}
                />
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
                  {initialData ? t('pages.actions.edit') : t('pages.actions.create')}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    ></ConfirmModal>
  );
};

export default ActionsModal;
