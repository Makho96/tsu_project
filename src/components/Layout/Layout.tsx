import Routing from "../../routing/Routing";
import styles from "./Layout.module.scss";
import Sidebar from "../Sidebar/SIdebar";
import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

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
    <div className={styles.container}>
      {showSidebar && (
        <div className={styles.sidebar_container}>
          <Sidebar isOpen={isSidebarOpen} onToggle={onSidebarToggle} />
        </div>
      )}
      <div className={styles.main_container}>
        <Routing />
      </div>
    </div>
  );
};

export default Layout;
