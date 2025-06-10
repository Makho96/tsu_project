import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TextFieldsOutlinedIcon from "@mui/icons-material/TextFieldsOutlined";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useEvent from "../../../hooks/useEvent";
import { deleteFormInput } from "../../../store/actionForm/actionsForm.thunks";
import { FormInputData } from "../../../store/actionForm/actionsForm.types";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";
import ActionFormModal from "../ActionFormModal/ActionFormModal";
import ConfirmModal from "../Modals/Confirm/Confirm";

type InputListItemProps = {
  input: FormInputData;
};

const InputListItem = ({ input }: InputListItemProps) => {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteInput = useEvent(async () => {
    try {
      return await dispatch(
        deleteFormInput({ id: input.id, actionId: input.action.id })
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 3,
        borderRadius: 1,
        backgroundColor: "blue.1000",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "white.100",
        },
        cursor: "pointer",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <TextFieldsOutlinedIcon sx={{ fontSize: 48 }} />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h4">{input.name}</Typography>
          <Typography variant="h6">{input.description}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={t(`pages.actionFormModal.${input.type}`)}
              sx={{
                minWidth: 75,
                backgroundColor: "white.100",
                padding: "0",
              }}
            />
            {input.requirement && (
              <Chip
                label={t("pages.actionFormModal.requirement")}
                sx={{ backgroundColor: "red.200", color: "red.300" }}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={2} flexShrink={0}>
        <Tooltip title={t("pages.actionFormModal.edit")}>
          <EditOutlinedIcon
            sx={{ fontSize: 24, cursor: "pointer" }}
            onClick={() => setIsEditModalOpen(true)}
          />
        </Tooltip>
        <Tooltip title={t("pages.actionFormModal.delete")}>
          <DeleteOutlineOutlinedIcon
            sx={{ fontSize: 24, cursor: "pointer", color: "red.500" }}
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </Tooltip>
      </Box>
      {isEditModalOpen && (
        <ActionFormModal
          actionId={input.action.id}
          onClose={() => setIsEditModalOpen(false)}
          initialData={input}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={t("pages.actionFormModal.delete")}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteInput}
          modalBody={
            <Typography variant="body1">
              {t("pages.actionFormModal.deleteConfirmation")}
            </Typography>
          }
          confirmButtonText={t("pages.actionFormModal.delete")}
          cancelButtonText={t("pages.actionFormModal.cancel")}
        />
      )}
    </Box>
  );
};

export default InputListItem;
