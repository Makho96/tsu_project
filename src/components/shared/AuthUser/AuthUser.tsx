import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import Routes from "../../../routing/Routing.types";
import { RolesToNamesMapper } from "../../../store/auth/auth.consts";
import { logoutThunk } from "../../../store/auth/auth.thunks";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../store/hooks/useTypedSelector";

const AuthUser = () => {
  const user = useAppSelector((state) => state.auth.user!);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleLogout = useCallback(async () => {
    await dispatch(logoutThunk());
    navigate(Routes.Login);
    handleClose();
  }, [dispatch, handleClose, navigate]);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        width="200px"
        justifyContent="space-between"
        sx={{ cursor: "pointer", "&:hover": { backgroundColor: "white.100" } }}
        padding={1}
        borderRadius={1}
        onClick={handleClick}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          width="200px"
          justifyContent="flex-start"
        >
          <Box>
            {user.profilePicture ? (
              <Avatar
                src={user.profilePicture}
                alt={user.username}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.username[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {RolesToNamesMapper[user.role]}
            </Typography>
          </Box>
        </Box>
        <Box>
          <KeyboardArrowDownOutlinedIcon sx={{ color: "common.white" }} />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: "200px",
            maxWidth: "200px",
          },
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "blue.800",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthUser;
