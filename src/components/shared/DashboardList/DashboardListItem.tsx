import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEvent from "../../../hooks/useEvent";
import { Action } from "../../../store/actions/actions.types";

type DashboardListItemProps = {
  data: Action;
};

const DashboardListItem = ({ data }: DashboardListItemProps) => {
  const { id, title, color } = data;
  const navigate = useNavigate();
  const params = useParams();
  const companyId = useMemo(() => Number(params.id), [params.id]);

  const handleClick = useEvent(() => {
    navigate(`/company/${companyId}/actions/${id}`);
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 3,
        borderRadius: 1,
        backgroundColor: color || "black.1000",
        cursor: "pointer",
        transition: "all 500ms",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
      onClick={handleClick}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={1}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <ChevronRightIcon sx={{ fontSize: 20 }} />
      </Box>
    </Box>
  );
};

export default DashboardListItem;
