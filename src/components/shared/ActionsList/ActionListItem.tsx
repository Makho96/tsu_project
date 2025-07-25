import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Tooltip, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useEvent from "../../../hooks/useEvent";
import { deleteAction, getAction } from "../../../store/actions/actions.thunks";
import { Action } from "../../../store/actions/actions.types";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";
import ActionFieldsManagementModal from "../ActionFieldsManagementModal/ActionFieldsManagementModal";
import ActionsModal from "../ActionsModal";
import { FullPageLoader } from "../Loader";
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
  const [isManageFieldsModalOpen, setIsManageFieldsModalOpen] = useState(false);
  const [actionData, setActionData] = useState<Action | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();
  const companyId = useMemo(() => Number(params.id), [params.id]);

  const handleEditAction = useEvent(async () => {
    try {
      setIsActionLoading(true);
      const action = await dispatch(getAction(id)).unwrap();
      setActionData(action);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsActionLoading(false);
    }
  });

  const handleDeleteAction = useEvent(async () => {
    try {
      return await dispatch(deleteAction({ id, companyId })).unwrap();
    } catch (error) {
      console.error(error);
    }
  });

  if (isActionLoading) {
    return <FullPageLoader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 3,
        borderRadius: 1,
        backgroundColor: color || "black.1000",
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
            <SettingsOutlinedIcon
              sx={{ fontSize: 16, cursor: "pointer" }}
              onClick={() => setIsManageFieldsModalOpen(true)}
            />
          </Tooltip>
          <Tooltip title={t("pages.actions.editAction")}>
            <EditOutlinedIcon
              sx={{ fontSize: 16, cursor: "pointer" }}
              onClick={handleEditAction}
            />
          </Tooltip>
          <Tooltip title={t("pages.actions.deleteAction")}>
            <DeleteOutlineOutlinedIcon
              sx={{ fontSize: 16, cursor: "pointer" }}
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </Tooltip>
        </Box>
      )}
      {isManageFieldsModalOpen && (
        <ActionFieldsManagementModal
          onClose={() => setIsManageFieldsModalOpen(false)}
          actionId={id}
        />
      )}
      {isEditModalOpen && actionData && (
        <ActionsModal initialData={actionData} setIsOpen={setIsEditModalOpen} />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={t("pages.actions.deleteAction")}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAction}
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
