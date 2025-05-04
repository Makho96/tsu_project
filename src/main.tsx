import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./store/index.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getUpdatedTheme } from "./theme.ts";
import { Bounce, ToastContainer } from "react-toastify";
import "./i18n.ts";
import i18n from "./i18n.ts";

const AppWrapper = () => {
  const [currentTheme, setCurrentTheme] = useState(getUpdatedTheme());

  useEffect(() => {
    // Update theme when language changes
    const handleLanguageChange = () => {
      setCurrentTheme(getUpdatedTheme());
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <StrictMode>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<AppWrapper />);
