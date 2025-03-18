import React, { createContext, useState, useCallback, useEffect } from "react";
import { Snackbar, Alert, Box } from "@mui/material";

const ToastContext = createContext();

let showToastGlobal = () => {};

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showToast = useCallback((message, severity = "success", duration) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
    setTimeout(() => setOpen(false), duration);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    showToastGlobal = showToast;
  }, [showToast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={500}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: "100%", padding: 1 }}
          action={null}
        >
          <Box sx={{ marginLeft: 5, marginRight: 1 }}>{message}</Box>
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const toast = (message, severity = "success", duration = 6000) => {
  showToastGlobal(message, severity, duration);
};
