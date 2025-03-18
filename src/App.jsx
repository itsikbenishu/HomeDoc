import { HashRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastProvider } from "./utils/toast";

import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ResidencePage from "./pages/ResidencePage";
import ChattelsPage from "./pages/ChattelsPage";
import Navbar from "./componets/NavBar";

const portalTheme = createTheme({
  palette: {
    primary: {
      main: "#130b65",
      contrastText: "white",
    },
    secondary: {
      main: "rgb(205 213 225)",
      contrastText: "#130b65",
    },
  },
});

const App = () => {  
  return (
    <ThemeProvider theme={portalTheme}>
      <ToastProvider>
        <div dir="rtl" style={{ backgroundColor: "#130b65", height: "100vh" }}>
          <HashRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Results" element={<SearchResultsPage />} />
              <Route path="/Results/Residence/:id/:mode?" element={<ResidencePage />} />
              <Route path="/Results/Chattels/:id/:mode?" element={<ChattelsPage />} />
            </Routes>
          </HashRouter>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
