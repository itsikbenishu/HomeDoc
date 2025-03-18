import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { SYS_NAME } from "../Constants";

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

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Box onClick={()=>navigate('/')}>
          <Typography variant="h4" className={classes.logo}>
            {SYS_NAME}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
