import { useTranslation } from "react-i18next";
import { logoutThunk } from "../store/auth/auth.thunks";
import { useAppDispatch } from "../store/hooks/useTypedSelector";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  console.log(t);

  const switchLang = (lng: string) => i18n.changeLanguage(lng);

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <p>{t("description")}</p>
      <button onClick={() => switchLang("en")}>English</button>
      <button onClick={() => switchLang("ka")}>Georgian</button>
      <button onClick={() => dispatch(logoutThunk())}>Logout</button>
    </div>
  );
};

export default Dashboard;
