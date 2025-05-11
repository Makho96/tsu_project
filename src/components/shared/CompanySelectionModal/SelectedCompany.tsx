import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

import { Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import CompanySelectionModal from "./CompanySelectionModal";
import { useAppSelector } from "../../../store/hooks/useTypedSelector";

const SelectedCompany = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );

  return (
    <>
      <Tooltip
        title={currentCompany?.title}
        sx={{ width: "200px", padding: "20px", borderRadius: "5px" }}
      >
        <Box
          sx={{
            cursor: "pointer",
            borderRadius: 1,
            border: "1px solid",
            padding: "10px",
            color: "common.white",
            maxWidth: "200px",
            minWidth: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MeetingRoomOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography
              variant="body1"
              sx={{
                maxWidth: "130px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {currentCompany?.title}
            </Typography>
          </Box>
          <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 20 }} />
        </Box>
      </Tooltip>
      {isModalOpen && (
        <CompanySelectionModal handleClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default SelectedCompany;
