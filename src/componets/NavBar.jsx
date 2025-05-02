import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { SYS_NAME } from "../../Constants";

const useStyles = makeStyles(() => ({
  appBar: {
    borderBottom: "1px solid white",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Box onClick={() => navigate("/")}>
          <Typography variant={isMobile ? "h5" : "h4"} className={classes.logo}>
            {SYS_NAME}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
