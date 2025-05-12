import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Action } from "../../../store/actions/actions.types";
import { ConfirmModal } from "../Modals";

type ActionListItemProps = {
  action: Action;
  showActions?: boolean;
};

const ActionListItem = ({
  action,
  showActions = true,
}: ActionListItemProps) => {
  const { id, title, color } = action;
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 3,
        borderRadius: 1,
        backgroundColor: "blue.800",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={1}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      {showActions && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <Tooltip title={t("pages.actions.manageFields")}>
            <SettingsOutlinedIcon sx={{ fontSize: 16, cursor: "pointer" }} />
          </Tooltip>
          <Tooltip title={t("pages.actions.editAction")}>
            <EditOutlinedIcon sx={{ fontSize: 16, cursor: "pointer" }} />
          </Tooltip>
          <Tooltip title={t("pages.actions.deleteAction")}>
            <DeleteOutlineOutlinedIcon
              sx={{ fontSize: 16, cursor: "pointer" }}
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </Tooltip>
        </Box>
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={t("pages.actions.deleteAction")}
          onClose={() => setIsDeleteModalOpen(false)}
          modalBody={
            <Typography variant="body1">
              {t("pages.actions.deleteActionConfirmation")}
            </Typography>
          }
          confirmButtonText={t("pages.actions.deleteActionButton")}
          cancelButtonText={t("pages.actions.cancel")}
        />
      )}
    </Box>
  );
};

export default ActionListItem;
