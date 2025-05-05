import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bgcolor="blue.800"
      zIndex={1000}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
