import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

type NavigationItemProps = {
  path: string;
  label: string;
  icon?: React.ReactNode;
};

const NavigationItem = (props: NavigationItemProps) => {
  const { path, label, icon } = props;

  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <ListItem disablePadding key={label}>
          <ListItemButton
            sx={{
              backgroundColor: isActive ? "green.500" : "transparent",
              "&:hover": {
                backgroundColor: "green.500",
              },
              paddingInline: "20px",
            }}
          >
            {icon && (
              <ListItemIcon sx={isActive ? { color: "white" } : {}}>
                {icon}
              </ListItemIcon>
            )}
            <ListItemText
              sx={{
                color: "common.white",
                whiteSpace: "nowrap",
              }}
              primary={label}
            />
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  );
};

export default NavigationItem;
