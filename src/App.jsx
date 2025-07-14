import { useMemo, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { ToastProvider } from "./utils/toast";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ResidencePage from "./pages/ResidencePage";
import ChattelsPage from "./pages/ChattelsPage";
import Navbar from "./components/app/NavBar";
import NetworkStatusDialog from "./components/app/NetworkStatusDialog";

const createEmotionCache = (isRTL) =>
  createCache({
    key: isRTL ? "mui-rtl" : "mui",
    stylisPlugins: isRTL ? [prefixer, rtlPlugin] : [],
  });

const App = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "he";

  const emotionCache = useMemo(() => createEmotionCache(isRTL), [isRTL]);
  const portalTheme = useMemo(
    () =>
      createTheme({
        direction: isRTL ? "rtl" : "ltr",
        palette: {
          primary: {
            main: "#130b65",
            contrastText: "white",
          },
          secondary: {
            main: "rgba(242, 210, 161, 0.92)",
            contrastText: "#130b65",
          },
          background: {
            default: "#e3e8e8",
          },
          text: {
            primary: "#130b65",
          },
        },

        components: {
          MuiBox: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [isRTL]
  );

  useEffect(() => {
    document.body.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={portalTheme}>
        <ToastProvider>
          <div
            style={{
              backgroundColor: "#e3e8e8",
              minHeight: "100vh",
            }}
          >
            <HashRouter>
              <Navbar />
              <NetworkStatusDialog />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Results" element={<SearchResultsPage />} />
                <Route
                  path="/Results/Residence/:id/:mode?"
                  element={<ResidencePage />}
                />
                <Route
                  path="/Results/Chattels/:id/:mode?"
                  element={<ChattelsPage />}
                />
              </Routes>
            </HashRouter>
          </div>
        </ToastProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
