import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { Box, Typography, IconButton } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  deleteCompany,
  getCompany,
} from "../../../store/companies/companies.thunks";
import { Company } from "../../../store/companies/companies.types";
import { useAppDispatch } from "../../../store/hooks/useTypedSelector";
import CompanyModal from "../CompanyModal";
import { FullPageLoader } from "../Loader";
import { ConfirmModal } from "../Modals";

type CompanyItemProps = {
  companyData: Company;
};

enum ModalTypes {
  Edit = "edit",
  Delete = "delete",
}

const CompanyItem = ({ companyData }: CompanyItemProps) => {
  const { t } = useTranslation();
  const [modalType, setModalType] = useState<ModalTypes | null>(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);
  const dispatch = useAppDispatch();

  const handleEditCompany = useCallback(async () => {
    try {
      setCompanyLoading(true);
      const company = await dispatch(getCompany(companyData.id)).unwrap();
      setCompany(company);
      setModalType(ModalTypes.Edit);
    } catch (error) {
      console.error(error);
    } finally {
      setCompanyLoading(false);
    }
  }, [companyData, dispatch]);

  const handleDeleteCompany = useCallback(async () => {
    await dispatch(deleteCompany(companyData.id));
    setModalType(null);
  }, [companyData.id, dispatch]);

  if (companyLoading) {
    return <FullPageLoader />;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "white.100",
      }}
      borderRadius={1}
      padding={2}
    >
      <Box display="flex" alignItems="flex-start" gap={1}>
        <MeetingRoomOutlinedIcon
          sx={{ color: "rgb(26, 125, 120)", fontSize: 32 }}
        />
        <Box>
          <Typography variant="h2" lineHeight={1} marginBottom={1}>
            {companyData.title}
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            gap={1}
            variant="body1"
            lineHeight={1}
            color="text.secondary"
            marginBottom={0.5}
          >
            <EmailOutlinedIcon sx={{ color: "text.secondary", fontSize: 16 }} />{" "}
            {companyData.eMail}
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            gap={1}
            variant="body1"
            lineHeight={1}
            color="text.secondary"
            marginBottom={0.5}
          >
            <LocalPhoneOutlinedIcon
              sx={{ color: "text.secondary", fontSize: 16 }}
            />{" "}
            {companyData.tell}
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={handleEditCompany}>
          <EditOutlinedIcon sx={{ color: "common.white" }} />
        </IconButton>
        <IconButton onClick={() => setModalType(ModalTypes.Delete)}>
          <DeleteOutlineOutlinedIcon sx={{ color: "red.500" }} />
        </IconButton>
      </Box>
      {modalType === ModalTypes.Delete && (
        <ConfirmModal
          title={t("pages.companies.deleteCompany")}
          modalBody={t("pages.companies.deleteCompanyConfirmation")}
          confirmButtonText={t("pages.companies.delete")}
          cancelButtonText={t("pages.companies.cancel")}
          onClose={() => setModalType(null)}
          onConfirm={handleDeleteCompany}
        />
      )}
      {modalType === ModalTypes.Edit && company && (
        <CompanyModal
          setIsOpen={() => setModalType(null)}
          initialData={company}
        />
      )}
    </Box>
  );
};

export default CompanyItem;
