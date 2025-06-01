import { Box } from "@mui/material";
import DashboardList from "../components/shared/DashboardList/DashboardList";

const Dashboard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      position="relative"
    >
      <Box margin="auto" width="800px">
        <DashboardList />
      </Box>
    </Box>
  );
};

export default Dashboard;
