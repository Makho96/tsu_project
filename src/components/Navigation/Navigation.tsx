import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useTranslation } from "react-i18next";
import Routes from "../../routing/Routing.types";
import { Roles } from "../../store/auth/auth.types";
import { useAppSelector } from "../../store/hooks/useTypedSelector";
import NavigationItem from "../shared/NavigationItem/NavigationItem";

enum NavigationItems {
  Dashboard = "dashboard",
  Companies = "companies",
  Admin = "admin",
  Settings = "settings",
}

const navigation = [
  {
    label: NavigationItems.Dashboard,
    path: Routes.Dashboard,
    haveAccess: [Roles.ADMIN, Roles.USER],
    icon: <DashboardOutlinedIcon sx={{ color: "common.white" }} />,
  },
  {
    label: NavigationItems.Companies,
    path: Routes.Companies,
    haveAccess: [Roles.ADMIN],
    icon: <MeetingRoomOutlinedIcon sx={{ color: "common.white" }} />,
  },
  {
    label: NavigationItems.Settings,
    path: Routes.Settings,
    haveAccess: [Roles.ADMIN, Roles.USER],
    icon: <SettingsOutlinedIcon sx={{ color: "common.white" }} />,
  },
];

const Navigation = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user!);

  return (
    <nav>
      {navigation.map((item) => {
        if (!item.haveAccess.includes(user?.role)) {
          return null;
        }
        return (
          <NavigationItem
            key={item.label}
            path={item.path}
            label={t(`menu.${item.label}`)}
            icon={item.icon}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
