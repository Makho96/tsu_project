import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPlus } from "react-icons/go";
import { RiBuilding2Line } from "react-icons/ri";
import CompanyModal from "../../components/shared/CompanyModal/CompanyModal";
import { getCompanies } from "../../store/companies/companies.thunks";
import { useAppDispatch } from "../../store/hooks/useTypedSelector";

const Companies = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="flex-start"
        gap={1}
        flexDirection="column"
        margin="auto"
      >
        <Typography variant="h3" display="flex" alignItems="flex-end" gap={1}>
          <RiBuilding2Line size={32} /> {t("pages.companies.title")}
        </Typography>
        <Typography variant="body1">{t("pages.companies.subTitle")}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" paddingBlock={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{ bgcolor: "green.500", padding: "8px 16px", fontSize: "12px" }}
          startIcon={<GoPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          {t("pages.companies.addCompany")}
        </Button>
      </Box>
      <Box></Box>
      <CompanyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </Box>
  );
};

export default Companies;
