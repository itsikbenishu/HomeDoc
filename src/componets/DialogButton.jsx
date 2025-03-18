import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled("div")(({ theme, disabled }) => ({
  ...theme.typography.button,
  color: disabled ? theme.palette.grey[500] : theme.palette.primary.main,
  backgroundColor: theme.palette.primary.contrastText,
  width: theme.spacing(8),
  height: theme.spacing(3.4),
  margin: 2,
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.5 : 1,
  minWidth: "64px",
  fontWeight: 500,
  fontSize: "0.875rem",
  textTransform: "uppercase",
  lineHeight: "1.75",
  transition: "all 0.3s ease",
  "&:hover": !disabled && {
    backgroundColor: "rgb(205 213 225)",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
  },
}));

const DialogButton = ({ children, disabled, ...others }) => {
  return (
    <StyledButton {...others} role="button" tabIndex="0" disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default DialogButton;
