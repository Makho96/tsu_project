import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPlus } from "react-icons/go";
import { RiBuilding2Line } from "react-icons/ri";
import CompaniesList from "../../components/shared/CompaniesList/CompaniesList";
import CompanyModal from "../../components/shared/CompanyModal";
import ConfirmModal from "../../components/shared/Modals/Confirm/Confirm";
import {
  getCompanies,
  deleteCompany,
} from "../../store/companies/companies.thunks";
import { useAppDispatch } from "../../store/hooks/useTypedSelector";

enum ModalTypes {
  Edit = "edit",
  Delete = "delete",
}

const Companies = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );
  const [modalType, setModalType] = useState<ModalTypes | null>(null);

  const dispatch = useAppDispatch();

  const onCompanyEdit = useCallback((id: number) => {
    setSelectedCompanyId(id);
    setModalType(ModalTypes.Edit);
    setIsModalOpen(true);
  }, []);

  const onCompanyDelete = useCallback((id: number) => {
    setSelectedCompanyId(id);
    setModalType(ModalTypes.Delete);
  }, []);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const handleDeleteCompany = useCallback(async () => {
    if (selectedCompanyId) {
      await dispatch(deleteCompany(selectedCompanyId)).then(() => {
        setSelectedCompanyId(null);
        setModalType(null);
      });
    }
  }, [dispatch, selectedCompanyId]);

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
      <Box>
        <CompaniesList onEdit={onCompanyEdit} onDelete={onCompanyDelete} />
      </Box>
      {isModalOpen && (
        <CompanyModal
          setIsOpen={setIsModalOpen}
          companyId={selectedCompanyId}
        />
      )}
      {selectedCompanyId && modalType === ModalTypes.Delete && (
        <ConfirmModal
          title={t("pages.companies.deleteCompany")}
          modalBody={t("pages.companies.deleteCompanyConfirmation")}
          confirmButtonText={t("pages.companies.delete")}
          cancelButtonText={t("pages.companies.cancel")}
          onClose={() => setSelectedCompanyId(null)}
          onConfirm={handleDeleteCompany}
        />
      )}
    </Box>
  );
};

export default Companies;
