import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Button, Input, InputAdornment, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import DepartmentsList from "../../components/shared/DepartmentsList/DepartmentsList";
import DepartmentsModal from "../../components/shared/DepartmentsModal/DepartmentsModal";
import useEvent from "../../hooks/useEvent";
import { useAppSelector } from "../../store/hooks/useTypedSelector";

const Action = () => {
  const [isDepartmentsModalOpen, setIsDepartmentsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const actions = useAppSelector((state) => state.actions.actions);
  const { departments } = useAppSelector((state) => state.departments);
  const navigate = useNavigate();
  const { actionId, id } = useParams();
  const { t } = useTranslation();
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );

  const departmentsForAction = useMemo(() => {
    if (searchQuery === "") return departments;

    return departments.filter(
      (department) =>
        department.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        department.contactPerson
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        department.tell.toLowerCase().includes(searchQuery.toLowerCase()) ||
        department.eMail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [departments, searchQuery]);

  const goToDashboard = useEvent(() => {
    navigate(`/company/${id}`);
  });

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
        height: "100%",
      }}
    >
      <PageHeader
        title={action.title}
        backgroundColor={action.color}
        arrowAction={goToDashboard}
      />
      <Box
        sx={{
          backgroundColor: "white.100",
          padding: 3,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "calc(100% - 102px)",
        }}
      >
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
            onClick={() => setIsDepartmentsModalOpen(true)}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        {!!currentCompany && (
          <Box sx={{ height: "calc(100% - 64px)", overflow: "auto" }}>
            <DepartmentsList departments={departmentsForAction} />
          </Box>
        )}
      </Box>
      {isDepartmentsModalOpen && (
        <DepartmentsModal setIsOpen={setIsDepartmentsModalOpen} />
      )}
    </Box>
  );
};

export default Action;
