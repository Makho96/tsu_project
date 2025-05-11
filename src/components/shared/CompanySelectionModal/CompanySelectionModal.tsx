import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useEvent from "../../../hooks/useEvent";
import Routes from "../../../routing/Routing.types";
import { setSelectedCompany } from "../../../store/companies/companies.slice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../store/hooks/useTypedSelector";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CompanySelectionModalProps = {
  handleClose: () => void;
};

const CompanySelectionModal = ({ handleClose }: CompanySelectionModalProps) => {
  const { t } = useTranslation();
  const companies = useAppSelector((state) => state.companies.companies);
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCompanySelection = useEvent((companyId: number) => {
    console.log(companyId, currentCompany?.id);

    if (!companyId || companyId === currentCompany?.id) {
      handleClose();
      return;
    }

    const company = companies.find((company) => company.id === companyId);
    if (company) {
      dispatch(setSelectedCompany(company));
      navigate(`${Routes.Company}/${companyId}`);
      handleClose();
    }
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={style}>
        <DialogTitle
          sx={{
            borderBottom: "1px solid",
            borderColor: "white.100",
            textAlign: "left",
            padding: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MeetingRoomOutlinedIcon sx={{ color: "common.white" }} />
          {t("modals.companySelection.title")}
        </DialogTitle>
        <Box
          display="flex"
          flexDirection="column"
          paddingTop={2}
          height="250px"
          overflow="auto"
          paddingInline={1}
        >
          {companies.map((company) => (
            <Box
              key={company.id}
              display="flex"
              alignItems="center"
              padding={2}
              borderRadius={1}
              border="1px solid transparent"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "green.100",
                  border: "1px solid",
                  borderColor: "green.500",
                },
              }}
              onClick={() => handleCompanySelection(company.id)}
            >
              <MeetingRoomOutlinedIcon sx={{ color: "common.white" }} />
              <Typography>{company.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default CompanySelectionModal;
