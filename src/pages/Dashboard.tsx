import { Box } from "@mui/material";
import ActionsList from "../components/shared/ActionsList/ActionsList";

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
        <ActionsList showActions={false} />
      </Box>
    </Box>
  );
};

export default Dashboard;
