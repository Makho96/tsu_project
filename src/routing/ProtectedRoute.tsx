import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useTypedSelector";

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
