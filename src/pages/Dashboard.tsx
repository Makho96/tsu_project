import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfirmModal } from "../components/shared/Modals";
import { logoutThunk } from "../store/auth/auth.thunks";
import { useAppDispatch } from "../store/hooks/useTypedSelector";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const switchLang = (lng: string) => i18n.changeLanguage(lng);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div>
      <h1>{t("login.title")}</h1>
      <p>{t("description")}</p>
      <button onClick={() => switchLang("en")}>English</button>
      <button onClick={() => switchLang("ka")}>Georgian</button>
      <button onClick={() => dispatch(logoutThunk())}>Logout</button>
      <button onClick={() => setIsConfirmModalOpen(true)}>Open modal</button>
      <ConfirmModal
        title="test"
        modalBody="test"
        onConfirm={() => {
          console.log("confirm");
          setIsConfirmModalOpen(false);
        }}
        onCancel={() => {
          console.log("cancel");
          setIsConfirmModalOpen(false);
        }}
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
      />
    </div>
  );
};

export default Dashboard;
