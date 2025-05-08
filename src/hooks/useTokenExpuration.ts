import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../routing/Routing.types";
import { logoutThunk } from "../store/auth/auth.thunks";
import { useAppDispatch } from "../store/hooks/useTypedSelector";

export const useTokenExpiration = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const checkTokenExpiration = () => {
      setLoading(true);
      const token = Cookies.get("token");
      if (!token) {
        navigate(Routes.Login);
        setLoading(false);
        return;
      }

      try {
        const payload = token.split(".")[1];
        if (!payload) return;

        const decoded = JSON.parse(atob(payload));
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          dispatch(logoutThunk());
        }
      } catch (e) {
        console.error("Error checking token expiration:", e);
      } finally {
        setLoading(false);
      }
    };

    checkTokenExpiration();
  }, [dispatch, navigate]);

  return { loading };
};
