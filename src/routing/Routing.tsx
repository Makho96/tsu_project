import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/Admin";
import Companies from "../pages/Companies/Companies";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/companies" element={<Companies />} />
      </Route>
    </Routes>
  );
};

export default Routing;
