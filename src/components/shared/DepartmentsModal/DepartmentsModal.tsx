import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { initialValues, validationSchema } from "./DepartmentsModal.config";
import {
  DepartmentsModalProps,
  FormFields,
  FormValues,
} from "./DepartmentsModal.types";
import useEvent from "../../../hooks/useEvent";
import { createDepartment } from "../../../store/departments/departments.thunks";
import { updateDepartment } from "../../../store/departments/departments.thunks";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";
import FormInput from "../FormInput/FormInput";
import { ConfirmModal } from "../Modals";

const DepartmentsModal = ({
  initialData,
  setIsOpen,
}: DepartmentsModalProps) => {
  const { t } = useTranslation();
  const closeModal = useEvent(() => setIsOpen(false));
  const dispatch = useAppDispatch();
  const params = useParams();

  const companyId = useMemo(() => params.id, [params.id]);
  const actionId = useMemo(() => params.actionId, [params.actionId]);

  const initialFormValues = useMemo(() => {
    if (initialData) {
      return {
        [FormFields.title]: initialData.title,
        [FormFields.contactPerson]: initialData.contactPerson,
        [FormFields.tell]: initialData.tell,
        [FormFields.eMail]: initialData.eMail,
      };
    }
    return initialValues;
  }, [initialData]);

  const handleSubmit = useEvent(async (values: FormValues) => {
    const params = {
      title: values[FormFields.title],
      contactPerson: values[FormFields.contactPerson],
      tell: values[FormFields.tell],
      eMail: values[FormFields.eMail],
    };

    if (initialData) {
      return await dispatch(
        updateDepartment({
          ...params,
          id: initialData.id,
          company: +companyId!,
          action: +actionId!,
        })
      ).then(closeModal);
    }

    return await dispatch(
      createDepartment({
        ...params,
        company: +companyId!,
        action: +actionId!,
      })
    ).then(closeModal);
  });

  return (
    <ConfirmModal
      onClose={closeModal}
      title={
        initialData
          ? t("pages.action.editDepartment")
          : t("pages.action.addDepartment")
      }
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ minWidth: "400px" }}>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.title}
                  label={t("pages.action.departmentName")}
                  startIcon={<ReceiptLongOutlinedIcon />}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.contactPerson}
                  label={t("pages.action.contactPerson")}
                  startIcon={<PersonOutlineOutlinedIcon />}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.tell}
                  label={t("pages.action.phone")}
                  startIcon={<LocalPhoneOutlinedIcon />}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <FormInput
                  name={FormFields.eMail}
                  label={t("pages.action.email")}
                  startIcon={<EmailOutlinedIcon />}
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
                  {t("pages.action.cancel")}
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
                    ? t("pages.action.edit")
                    : t("pages.action.save")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default DepartmentsModal;
