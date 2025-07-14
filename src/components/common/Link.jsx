import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Link = ({ to, children, ...others }) => (
  <MuiLink component={RouterLink} to={to} {...others}>
    {children}
  </MuiLink>
);

export default Link;
