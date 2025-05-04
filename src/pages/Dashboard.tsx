import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../store/hooks/useTypedSelector";
import api from "../api/axiosInstance";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  console.log(t);

  const switchLang = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <p>{t("description")}</p>
      <button onClick={() => switchLang("en")}>English</button>
      <button onClick={() => switchLang("ka")}>Georgian</button>
      <button onClick={() => api.post("/auth/logout")}>Logout</button>
    </div>
  );
};

export default Dashboard;
