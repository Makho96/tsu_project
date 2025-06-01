import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useEvent from "../../hooks/useEvent";
import Routes from "../../routing/Routing.types";
import { Roles } from "../../store/auth/auth.types";
import { useAppSelector } from "../../store/hooks/useTypedSelector";
import NavigationItem from "../shared/NavigationItem/NavigationItem";

enum NavigationItems {
  Dashboard = "dashboard",
  Companies = "companies",
  Admin = "admin",
  Settings = "settings",
  Actions = "actions",
}

const Navigation = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user!);
  const navigate = useNavigate();
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );

  const handleDashboardClick = useEvent((e: React.MouseEvent) => {
    e.preventDefault();
    if (currentCompany) {
      navigate(`${Routes.Company}/${currentCompany.id}`);
    } else {
      navigate(Routes.Company);
    }
  });

  const navigation = useMemo(
    () => [
      {
        label: NavigationItems.Dashboard,
        path: currentCompany
          ? `${Routes.Company}/${currentCompany.id}`
          : Routes.Company,
        haveAccess: [Roles.SUPERADMIN, Roles.ADMIN],
        icon: <DashboardOutlinedIcon sx={{ color: "common.white" }} />,
        onClick: handleDashboardClick,
        exact: true,
      },
      {
        label: NavigationItems.Actions,
        path: `${Routes.Company}/${currentCompany?.id}${Routes.Actions}`,
        haveAccess: [Roles.SUPERADMIN, Roles.ADMIN],
        icon: <ContentPasteIcon sx={{ color: "common.white" }} />,
        exact: true,
      },
      {
        label: NavigationItems.Companies,
        path: Routes.Companies,
        haveAccess: [Roles.SUPERADMIN, Roles.ADMIN],
        icon: <MeetingRoomOutlinedIcon sx={{ color: "common.white" }} />,
      },
      {
        label: NavigationItems.Settings,
        path: Routes.Settings,
        haveAccess: [Roles.SUPERADMIN, Roles.ADMIN],
        icon: <SettingsOutlinedIcon sx={{ color: "common.white" }} />,
      },
    ],
    [handleDashboardClick, currentCompany]
  );

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
            onClick={item.onClick}
            exact={item.exact}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
