import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ActionsList from "../../components/shared/ActionsList/ActionsList";
import ActionsModal from "../../components/shared/ActionsModal/ActionsModal";
import { Roles } from "../../store/auth/auth.types";
import { useAppSelector } from "../../store/hooks/useTypedSelector";

const Actions = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user!);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(user);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="flex-start"
        gap={1}
        flexDirection="column"
        margin="auto"
      ></Box>
      {[Roles.SUPERADMIN, Roles.ADMIN].includes(user.role) && (
        <Box display="flex" justifyContent="flex-end" paddingBlock={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "green.1000",
              padding: "8px 16px",
              fontSize: "12px",
            }}
            startIcon={<AddOutlinedIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            {t("pages.actions.addAction")}
          </Button>
        </Box>
      )}
      <Box>
        <ActionsList />
      </Box>
      {isModalOpen && <ActionsModal setIsOpen={setIsModalOpen} />}
    </Box>
  );
};

export default Actions;
