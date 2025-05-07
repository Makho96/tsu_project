import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography, IconButton } from "@mui/material";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { RiBuilding2Line } from "react-icons/ri";
import { Company } from "../../../store/companies/companies.types";

type CompanyItemProps = {
  companyData: Company;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const CompanyItem = ({ companyData, onEdit, onDelete }: CompanyItemProps) => {
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
        <RiBuilding2Line size={32} color="rgb(26, 125, 120)" />
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
            <MdOutlineEmail size={16} /> {companyData.eMail}
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
            <MdOutlinePhone size={16} /> {companyData.tell}
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={() => onEdit(companyData.id)}>
          <EditOutlinedIcon sx={{ color: "common.white" }} />
        </IconButton>
        <IconButton onClick={() => onDelete(companyData.id)}>
          <DeleteOutlineOutlinedIcon sx={{ color: "red.500" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CompanyItem;
