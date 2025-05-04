import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useTypedSelector";

interface ProtectedRouteProps {
  roles?: string[];
}

const ProtectedRoute = ({ roles = [] }: ProtectedRouteProps) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
