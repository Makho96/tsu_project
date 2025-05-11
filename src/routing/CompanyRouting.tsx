import { Route, Routes } from "react-router-dom";
import CompanyRoutingWrapper from "./CompanyRoutingWrapper";
import ProtectedRoute from "./ProtectedRoute";
import Actions from "../pages/Actions/Actions";
import CompanySelection from "../pages/Company/CompanySelection";
import Dashboard from "../pages/Dashboard";

const CompanyRouting = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<CompanySelection />} />
        <Route element={<CompanyRoutingWrapper />}>
          <Route path=":id" element={<Dashboard />} />
          <Route path=":id/actions" element={<Actions />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default CompanyRouting;
