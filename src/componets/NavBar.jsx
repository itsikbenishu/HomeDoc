import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import ChangeLangButton from "./ChangeLangButton";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
  const { i18n } = useTranslation();
  const { SYS_NAME } = useTranslatedConstants();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box onClick={() => navigate("/")}>
          <Button
            variant="text"
            color="inherit"
            sx={{ flexGrow: 1, textTransform: "none" }}
          >
            <Typography variant={isMobile ? "h5" : "h4"}>{SYS_NAME}</Typography>
          </Button>
        </Box>
        <Box>
          <ChangeLangButton handleClick={changeLanguage} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
