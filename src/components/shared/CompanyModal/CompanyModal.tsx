import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IoCheckmark } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import FormInput from "../FormInput/FormInput";
import { ConfirmModal } from "../Modals";
import { initialValues, validationSchema } from "./company.config";
import { CompanyModalProps, FormFields, FormValues } from "./company.types";
import { createCompany } from "../../../store/companies/companies.thunks";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";

const CompanyModal = ({ setIsOpen, companyId }: CompanyModalProps) => {
  const { t } = useTranslation();
  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      return await dispatch(
        createCompany({
          title: values[FormFields.Name],
          eMail: values[FormFields.Email],
          tell: values[FormFields.Phone],
        })
      ).then(closeModal);
    },
    [dispatch, closeModal]
  );

  console.log(companyId);

  return (
    <ConfirmModal
      isOpen={true}
      onClose={closeModal}
      title={
        companyId
          ? t("pages.companies.editCompany")
          : t("pages.companies.addCompany")
      }
      confirmButtonText={
        companyId ? t("pages.companies.edit") : t("pages.companies.create")
      }
      cancelButtonText={t("pages.companies.cancel")}
      showButtons={false}
      modalBody={
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ minWidth: "400px" }}>
              <Box>
                <FormInput
                  name={FormFields.Name}
                  label={t("pages.companies.name")}
                  startIcon={
                    <MeetingRoomOutlinedIcon sx={{ color: "common.white" }} />
                  }
                />
              </Box>
              <Box>
                <FormInput
                  name={FormFields.Email}
                  label={t("pages.companies.email")}
                  startIcon={
                    <EmailOutlinedIcon sx={{ color: "common.white" }} />
                  }
                />
              </Box>
              <Box>
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
                  startIcon={<RxCross1 size={16} />}
                >
                  {t("pages.companies.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  loadingPosition="start"
                  sx={{
                    bgcolor: "green.500",
                    padding: "8px 12px",
                    minWidth: "110px",
                  }}
                  startIcon={<IoCheckmark size={20} />}
                >
                  {companyId
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
