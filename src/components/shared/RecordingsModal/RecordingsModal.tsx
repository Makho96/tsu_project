import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "../Modals";
import RecordingsModalProps from "./RecordingsModal.types";
import FormInput from "../FormInput/FormInput";

const RecordingsModal = ({ setIsOpen, formInputs }: RecordingsModalProps) => {
  const { t } = useTranslation();

  const initialFormValues = useMemo(() => {
    return {};
  }, []);

  return (
    <ConfirmModal
      title={t("pages.department.newRecord")}
      onClose={() => setIsOpen(false)}
      onConfirm={() => {}}
      onCancel={() => setIsOpen(false)}
      showButtons={false}
      modalBody={
        <Formik initialValues={initialFormValues} onSubmit={() => {}}>
          {({ isSubmitting, setValues, values }) => (
            <Form style={{ minWidth: "400px" }}>
              {formInputs.map((input) => (
                <Box key={input.key} sx={{ marginBottom: 2 }}>
                  <FormInput
                    name={input.name}
                    label={input.name}
                    type={input.type}
                  />
                </Box>
              ))}
              <Box
                display="flex"
                gap={2}
                justifyContent="flex-end"
                marginTop={2}
              >
                <Button
                  onClick={() => setIsOpen(false)}
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
                  {t("pages.actions.create")}
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
