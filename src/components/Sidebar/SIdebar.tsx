import { Box } from "@mui/material";

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = (props: SidebarProps) => {
  const { isOpen } = props;

  return (
    <Box
      width={isOpen ? 300 : 64}
      sx={{
        transition: "all 250ms",
      }}
      borderRight="1px solid"
      borderColor="rgb(255 255 255 / 0.1)"
      height="100%"
      bgcolor="blue.800"
    ></Box>
  );
};

export default Sidebar;
