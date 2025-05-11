import { Route, Routes } from "react-router-dom";
import CompanyRouting from "./CompanyRouting";
import ProtectedRoute from "./ProtectedRoute";
import NavigationRoutes from "./Routing.types";
import Companies from "../pages/Companies/Companies";
import Login from "../pages/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/company/*" element={<CompanyRouting />} />

      <Route element={<ProtectedRoute />}>
        <Route path={NavigationRoutes.Companies} element={<Companies />} />
      </Route>
    </Routes>
  );
};

export default Routing;
