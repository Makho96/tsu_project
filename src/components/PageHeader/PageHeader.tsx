import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  arrowAction?: () => void;
  backgroundColor?: string;
};

const PageHeader = ({
  title,
  arrowAction,
  backgroundColor,
}: PageHeaderProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      bgcolor={backgroundColor || "primary.main"}
      padding={3}
      borderRadius={1}
    >
      {!!arrowAction && (
        <Box onClick={arrowAction} sx={{ cursor: "pointer" }}>
          <KeyboardBackspaceOutlinedIcon sx={{ color: "common.white" }} />
        </Box>
      )}
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
};

export default PageHeader;
