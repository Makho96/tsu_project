import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTokenExpiration } from "../../hooks/useTokenExpuration";
import Routing from "../../routing/Routing";
import Header from "../shared/Header/Header";
import Loader from "../shared/Loader";
import Sidebar from "../Sidebar/SIdebar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const showFullContent = useMemo(
    () => !location.pathname.includes("login"),
    [location]
  );
  const { loading } = useTokenExpiration();

  const onSidebarToggle = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, [setIsSidebarOpen]);

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
