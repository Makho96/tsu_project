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
  onClick?: (e: React.MouseEvent) => void;
  exact?: boolean;
};

const NavigationItem = (props: NavigationItemProps) => {
  const { path, label, icon, onClick, exact = false } = props;

  return (
    <NavLink to={path} end={exact} onClick={onClick} caseSensitive={true}>
      {({ isActive }) => (
        <ListItem disablePadding key={label}>
          <ListItemButton
            sx={{
              backgroundColor: isActive ? "green.1000" : "transparent",
              "&:hover": {
                backgroundColor: "green.400",
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
