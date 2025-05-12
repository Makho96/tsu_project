import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import FormInput from "../FormInput/FormInput";
import { ConfirmModal } from "../Modals";
import { initialValues, validationSchema } from "./company.config";
import { CompanyModalProps, FormFields, FormValues } from "./company.types";
import {
  createCompany,
  updateCompany,
} from "../../../store/companies/companies.thunks";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";

const CompanyModal = ({ setIsOpen, initialData }: CompanyModalProps) => {
  const { t } = useTranslation();
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const isEdit = useMemo(() => !!initialData, [initialData]);
  const dispatch = useAppDispatch();

  const initialFormValues = useMemo(() => {
    if (initialData) {
      return {
        [FormFields.Name]: initialData.title,
        [FormFields.Email]: initialData.eMail,
        [FormFields.Phone]: initialData.tell,
      };
    }
    return initialValues;
  }, [initialData]);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const companyData = {
        title: values[FormFields.Name],
        eMail: values[FormFields.Email],
        tell: values[FormFields.Phone],
      };

      const apiCall = initialData
        ? updateCompany({
            id: initialData.id,
            ...companyData,
          })
        : createCompany(companyData);

      return await dispatch(apiCall).then(closeModal);
    },
    [dispatch, closeModal, initialData]
  );

  return (
    <ConfirmModal
      onClose={closeModal}
      title={
        isEdit
          ? t("pages.companies.editCompany")
          : t("pages.companies.addCompany")
      }
      confirmButtonText={
        isEdit ? t("pages.companies.edit") : t("pages.companies.create")
      }
      cancelButtonText={t("pages.companies.cancel")}
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ minWidth: "400px" }}>
              <Box sx={{ marginBottom: 1 }}>
                <FormInput
                  name={FormFields.Name}
                  label={t("pages.companies.name")}
                  startIcon={
                    <MeetingRoomOutlinedIcon sx={{ color: "common.white" }} />
                  }
                />
              </Box>
              <Box sx={{ marginBottom: 1 }}>
                <FormInput
                  name={FormFields.Email}
                  label={t("pages.companies.email")}
                  startIcon={
                    <EmailOutlinedIcon sx={{ color: "common.white" }} />
                  }
                />
              </Box>
              <Box sx={{ marginBottom: 1 }}>
                <FormInput
                  name={FormFields.Phone}
                  label={t("pages.companies.phone")}
                  startIcon={
                    <LocalPhoneOutlinedIcon sx={{ color: "common.white" }} />
                  }
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
                  {t("pages.companies.cancel")}
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
                  {isEdit
                    ? t("pages.companies.edit")
                    : t("pages.companies.create")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default CompanyModal;
