import { Box } from "@mui/material";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar = (props: SidebarProps) => {
  const { isOpen, onToggle } = props;

  return (
    <Box
      width={isOpen ? 300 : 50}
      sx={{
        transition: "all 250ms",
      }}
      borderRight="1px solid"
      borderColor="rgb(255 255 255 / 0.1)"
      height="100%"
      bgcolor="blue.800"
    >
      <button onClick={onToggle}>{isOpen ? "close" : "open"}</button>
    </Box>
  );
};

export default Sidebar;
