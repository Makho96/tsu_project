import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Button, Input, InputAdornment, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import useEvent from "../../hooks/useEvent";
import { useAppSelector } from "../../store/hooks/useTypedSelector";

const Action = () => {
  const actions = useAppSelector((state) => state.actions.actions);
  const navigate = useNavigate();
  const { actionId, id } = useParams();
  const { t } = useTranslation();

  const goToDashboard = useEvent(() => {
    navigate(`/company/${id}`);
  });

  console.log(actions);

  const action = useMemo(() => {
    if (!actionId) return null;

    return actions.find((action) => action.id === +actionId);
  }, [actions, actionId]);

  if (!action) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <PageHeader
        title={action.title}
        backgroundColor={action.color}
        arrowAction={goToDashboard}
      />
      <Box sx={{ backgroundColor: "white.100", padding: 3, borderRadius: 1 }}>
        <Box display="flex" gap={2} justifyContent="space-between">
          <Button
            variant="outlined"
            sx={{
              borderColor: "gray.500",
              color: "common.white",
              transition: "all 0.3s ease",
              paddingBlock: "8px",
              "&:hover": {
                backgroundColor: "blue.800",
                color: "common.white",
              },
              flexShrink: 0,
            }}
            startIcon={<AddOutlinedIcon />}
          >
            <Typography variant="h6">
              {t("pages.action.addDepartment")}
            </Typography>
          </Button>
          <Input
            placeholder={t("pages.action.departmentName")}
            sx={{
              width: "450px",
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Action;
