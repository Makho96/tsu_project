import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useTypedSelector";

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/login" />;

  return (
    <Box width="100%" height="100%" padding={2}>
      <Outlet />
    </Box>
  );
};

export default ProtectedRoute;
