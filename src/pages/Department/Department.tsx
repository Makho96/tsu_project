import { Box } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const Department = () => {
  const params = useParams();
  const departmentId = useMemo(
    () => Number(params.departmentId),
    [params.departmentId]
  );

  return <Box>Department {departmentId}</Box>;
};

export default Department;
