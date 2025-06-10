import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { initialValues, validationSchema } from "./ActionFormModal.config";
import {
  ActionFormModalProps,
  FormFields,
  FormValues,
} from "./ActionFormModal.types";
import useEvent from "../../../hooks/useEvent";
import {
  createFormInput,
  updateFormInput,
} from "../../../store/actionForm/actionsForm.thunks";
import { FormFieldTypes } from "../../../store/actionForm/actionsForm.types";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";
import FormCheckbox from "../FormCheckbox/FormCheckbox";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import ConfirmModal from "../Modals/Confirm/Confirm";

const ActionFormModal = ({
  initialData,
  onClose,
  actionId,
}: ActionFormModalProps) => {
  const { t } = useTranslation();
  const closeModal = useCallback(() => onClose(), [onClose]);
  const dispatch = useAppDispatch();

  const initialFormValues = useMemo(() => {
    if (initialData) {
      return {
        [FormFields.name]: initialData.name,
        [FormFields.description]: initialData.description,
        [FormFields.legalName]: initialData.legalName,
        [FormFields.type]: initialData.type,
        [FormFields.requirement]: !!initialData.requirement,
        [FormFields.hidden]: !!initialData.hidden,
        [FormFields.key]: initialData.key,
      };
    }
    return initialValues;
  }, [initialData]);

  const handleSubmit = useEvent(async (values: FormValues) => {
    const params = {
      name: values[FormFields.name],
      description: values[FormFields.description],
      legalName: values[FormFields.legalName],
      type: values[FormFields.type],
      requirement: values[FormFields.requirement],
      hidden: values[FormFields.hidden],
      key: initialData
        ? initialData.key
        : values[FormFields.name] + "_" + values[FormFields.type],
      action: actionId,
    };

    if (initialData) {
      return await dispatch(
        updateFormInput({ ...params, id: initialData.id })
      ).then(closeModal);
    }

    return await dispatch(createFormInput(params)).then(closeModal);
  });

  const typeOptions = useMemo(() => {
    return Object.values(FormFieldTypes).map((type) => ({
      value: type,
      label: t(`pages.actionFormModal.${type}`),
    }));
  }, [t]);

  console.log(initialFormValues);

  return (
    <ConfirmModal
      onClose={closeModal}
      title={t("pages.actionFormModal.title")}
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form style={{ minWidth: "400px" }} onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.name}
                  label={t("pages.actionFormModal.name")}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.description}
                  label={t("pages.actionFormModal.description")}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.legalName}
                  label={t("pages.actionFormModal.legalName")}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormSelect
                  name={FormFields.type}
                  label={t("pages.actionFormModal.type")}
                  options={typeOptions}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormCheckbox
                  name={FormFields.requirement}
                  label={t("pages.actionFormModal.requirement")}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormCheckbox
                  name={FormFields.hidden}
                  label={t("pages.actionFormModal.hidden")}
                />
              </Box>
              <Box
                display="flex"
                gap={2}
                justifyContent="flex-end"
                marginTop={2}
              >
                <Button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{ padding: "8px 12px", minWidth: "110px" }}
                  variant="outlined"
                  startIcon={
                    <ClearOutlinedIcon sx={{ color: "common.white" }} />
                  }
                >
                  {t("pages.actionFormModal.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{
                    bgcolor: "green.1000",
                    padding: "8px 12px",
                    minWidth: "110px",
                  }}
                  startIcon={
                    <CheckOutlinedIcon sx={{ color: "common.white" }} />
                  }
                >
                  {initialData
                    ? t("pages.actionFormModal.edit")
                    : t("pages.actionFormModal.create")}
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
