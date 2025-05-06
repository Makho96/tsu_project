import { useTranslation } from "react-i18next";
import { CiSettings } from "react-icons/ci";
import { RiDashboardHorizontalLine, RiBuilding2Line } from "react-icons/ri";
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
    path: "/dashboard",
    haveAccess: [Roles.ADMIN, Roles.USER],
    icon: <RiDashboardHorizontalLine size={24} color="white" />,
  },
  {
    label: NavigationItems.Companies,
    path: "/companies",
    haveAccess: [Roles.ADMIN],
    icon: <RiBuilding2Line size={24} color="white" />,
  },
  {
    label: NavigationItems.Settings,
    path: "/settings",
    haveAccess: [Roles.ADMIN, Roles.USER],
    icon: <CiSettings size={24} color="white" />,
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
