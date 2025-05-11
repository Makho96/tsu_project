import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useEvent from "../../hooks/useEvent";
import { useTokenExpiration } from "../../hooks/useTokenExpiration";
import Routing from "../../routing/Routing";
import { getCompanies } from "../../store/companies/companies.thunks";
import {
  useAppSelector,
  useAppDispatch,
} from "../../store/hooks/useTypedSelector";
import Header from "../shared/Header/Header";
import Loader from "../shared/Loader";
import Sidebar from "../Sidebar/SIdebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.auth);

  const onSidebarToggle = useEvent(() =>
    setIsSidebarOpen((prevState) => !prevState)
  );

  const dispatch = useAppDispatch();

  const location = useLocation();
  const showFullContent = useMemo(
    () => !location.pathname.includes("login"),
    [location]
  );
  const { loading } = useTokenExpiration();

  useEffect(() => {
    if (token && user) {
      dispatch(getCompanies());
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (!user || !token) {
      return;
    }
  }, [user, token, dispatch]);

  if (loading) return <Loader />;

  return (
    <Box
      width="100%"
      height="100vh"
      minHeight="100vh"
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
      alignItems="center"
      bgcolor="blue.1000"
    >
      {showFullContent && (
        <Header isOpen={isSidebarOpen} handleToggle={onSidebarToggle} />
      )}
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        sx={{
          height: "calc(100% - 64px)",
        }}
      >
        {showFullContent && (
          <Box flexShrink={0} height="100%">
            <Sidebar isOpen={isSidebarOpen} />
          </Box>
        )}
        <Box width="100%" height="100%">
          <Routing />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
