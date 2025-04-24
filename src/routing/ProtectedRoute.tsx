import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks/useTypedSelector";

interface ProtectedRouteProps {
  roles?: string[];
}

const ProtectedRoute = ({ roles = [] }: ProtectedRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;

  if (roles.length && !roles.includes(user?.role ?? ""))
    return <div>Access Denied</div>;

  return <Outlet />;
};

export default ProtectedRoute;
