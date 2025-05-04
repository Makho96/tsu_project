import Routing from "../../routing/Routing";
import Sidebar from "../Sidebar/SIdebar";
import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../shared/Header/Header";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const showSidebar = useMemo(
    () => !location.pathname.includes("login"),
    [location]
  );

  const onSidebarToggle = useCallback(() => {
    setIsSidebarOpen((prevState) => !prevState);
  }, [setIsSidebarOpen]);

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
      <Header />
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        sx={{
          height: "calc(100% - 64px)",
        }}
      >
        {showSidebar && (
          <Box flexShrink={0} height="100%">
            <Sidebar isOpen={isSidebarOpen} onToggle={onSidebarToggle} />
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
