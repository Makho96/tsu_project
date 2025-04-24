import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import AdminPage from "../pages/Admin";

const Routing = () => {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
    </Route>
    <Route element={<ProtectedRoute roles={['admin']} />}>
      <Route path="/admin" element={<AdminPage />} />
    </Route>
  </Routes>
  )
}

export default Routing;