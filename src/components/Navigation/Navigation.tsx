import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Box, Divider, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useEvent from "../../hooks/useEvent";
import Routes from "../../routing/Routing.types";
import { Statuses } from "../../store/actions/actions.types";
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
  const actions = useAppSelector((state) => state.actions.actions);

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

  const topNavigation = useMemo(() => {
    if (!actions) return [];

    return actions
      .filter((action) => action.status === Statuses.ACTIVE)
      .map((item) => {
        return {
          label: item.title,
          path: `${Routes.Company}/${currentCompany?.id}${Routes.Actions}/${item.id}`,
          exact: true,
          icon: <DvrOutlinedIcon sx={{ color: "common.white" }} />,
          haveAccess: [Roles.SUPERADMIN, Roles.ADMIN],
        };
      });
  }, [actions, currentCompany]);

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
    <Box display="flex" flexDirection="column" gap={2}>
      {!!topNavigation.length && (
        <>
          <nav>
            <Typography
              variant="h6"
              sx={{ color: "gray.500", padding: "8px  20px" }}
            >
              {t("pages.actions.list")}
            </Typography>
            <ul>
              {topNavigation.map((item) => {
                if (!item.haveAccess.includes(user?.role)) {
                  return null;
                }
                return <NavigationItem key={item.label} {...item} />;
              })}
            </ul>
          </nav>
          <Divider sx={{ borderColor: "gray.500", borderWidth: "1px" }} />
        </>
      )}
      <nav style={{ marginTop: "20px" }}>
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
    </Box>
  );
};

export default Navigation;
