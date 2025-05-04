import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useTypedSelector";

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
