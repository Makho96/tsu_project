import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Modal, Typography, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useEvent from "../../../hooks/useEvent";
import { getFormData } from "../../../store/actionForm/actionsForm.thunks";
import { useAppSelector } from "../../../store/hooks/useTypedSelector";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";
import { SliceStatuses } from "../../../store/types";
import ActionFormModal from "../ActionFormModal/ActionFormModal";
import { Loader } from "../Loader";
import InputListItem from "./InputListItem";

type ActionFieldsManagementModalProps = {
  onClose: () => void;
  actionId: number;
};

const ActionFieldsManagementModal = ({
  onClose,
  actionId,
}: ActionFieldsManagementModalProps) => {
  const { t } = useTranslation();
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const isFormLoading = useAppSelector(
    (state) => state.actionsForm.status === SliceStatuses.LOADING
  );

  const formInputs = useAppSelector((state) => state.actionsForm.formInputs);

  const dispatch = useAppDispatch();

  const fetchFormData = useEvent(async () => {
    await dispatch(getFormData(actionId));
  });

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  return (
    <>
      <Modal
        open
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90vw",
            height: "90vh",
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isFormLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Loader />
            </Box>
          ) : (
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h3" component="h2">
                  {t("pages.actionFormModal.title")}
                </Typography>
                <IconButton onClick={onClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  overflowY: "auto",
                  height: "calc(100% - 145px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  p: 2,
                }}
              >
                {formInputs.map((input) => (
                  <InputListItem key={input.id} input={input} />
                ))}
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "green.1000",
                    padding: "8px 16px",
                    fontSize: "14px",
                  }}
                  startIcon={<AddOutlinedIcon />}
                  onClick={() => setIsInputModalOpen(true)}
                >
                  {t("pages.actionFormModal.addField")}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
      {isInputModalOpen && (
        <ActionFormModal
          onClose={() => setIsInputModalOpen(false)}
          actionId={actionId}
        />
      )}
    </>
  );
};

export default ActionFieldsManagementModal;
