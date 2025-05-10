import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import DialogButton from "./DialogButton";

const useStyles = makeStyles(() => ({
  dialogOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  },
  dialog: {
    background: "white",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    zIndex: "1001",
  },
}));

const ConfirmDialog = ({ dialog, isOpen, onClose, onConfirm }) => {
  const classes = useStyles();

  if (!isOpen) return null;

  return (
    <Box className={classes.dialogOverlay}>
      <Box className={classes.dialog}>
        <Box sx={{ mb: "10px" }}>
          <Typography
            variant="h6"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {dialog}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <DialogButton onClick={onConfirm}>כן</DialogButton>
          <DialogButton onClick={onClose}>לא</DialogButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmDialog;
