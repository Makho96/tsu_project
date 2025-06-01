import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { initialValues, validationSchema } from "./ActionsModal.config";
import {
  Colors,
  FormFields,
  FormValues,
  type ActionsModalProps,
} from "./ActionsModal.types";
import useEvent from "../../../hooks/useEvent";
import {
  createAction,
  updateAction,
} from "../../../store/actions/actions.thunks";
import { Statuses } from "../../../store/actions/actions.types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/hooks/useTypedSelector";
import FormInput from "../FormInput/FormInput";
import FormSelect from "../FormSelect/FormSelect";
import { ConfirmModal } from "../Modals";
import ColorPicker from "./ColorPicker";

const ActionsModal = ({ initialData, setIsOpen }: ActionsModalProps) => {
  const { t } = useTranslation();
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const dispatch = useAppDispatch();
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany!
  );

  const initialFormValues = useMemo(() => {
    if (initialData) {
      return {
        [FormFields.title]: initialData.title,
        [FormFields.status]: initialData.status,
        [FormFields.color]: initialData.color,
        [FormFields.description]: initialData.description,
      };
    }
    return initialValues;
  }, [initialData]);

  const handleSubmit = useEvent(async (values: FormValues) => {
    const params = {
      title: values[FormFields.title],
      status: values[FormFields.status],
      color: values[FormFields.color],
      description: values[FormFields.description],
    };

    const apiCall = initialData
      ? updateAction({
          ...params,
          id: initialData.id,
          company: currentCompany.id,
        })
      : createAction({
          ...params,
          company: currentCompany.id,
        });

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
      title={
        initialData
          ? t("pages.actions.editAction")
          : t("pages.actions.addAction")
      }
      confirmButtonText={
        initialData ? t("pages.actions.edit") : t("pages.actions.create")
      }
      cancelButtonText={t("pages.actions.cancel")}
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setValues, values }) => (
            <Form style={{ minWidth: "400px" }}>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.title}
                  label={t("pages.actions.title")}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormSelect
                  name={FormFields.status}
                  label={t("pages.actions.status")}
                  options={statusOptions}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 1,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <PaletteOutlinedIcon
                    sx={{ marginRight: 1, fontSize: "18px" }}
                  />
                  {t("pages.actions.color")}
                </Typography>
                <ColorPicker
                  onChange={(color: Colors) => {
                    setValues({
                      ...values,
                      [FormFields.color]: color,
                    });
                  }}
                  chosenColor={values[FormFields.color]}
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
                  {t("pages.actions.cancel")}
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
                    ? t("pages.actions.edit")
                    : t("pages.actions.create")}
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
