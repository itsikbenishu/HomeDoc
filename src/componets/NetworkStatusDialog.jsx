import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DialogButton from "./DialogButton";
import useNetworkStatus from "../hooks/useNetworkStatus,jsx";
import Loader from "./Loader";

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
    zIndex: "2001",
  },
}));

const NetworkStatusDialog = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const isOnline = useNetworkStatus();
  const [isLoading, setIsLoading] = useState(false);

  if (isOnline) return null;

  const handleRetry = () => {
    setIsLoading(true);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  if (isLoading) {
    return (
      <Box sx={{ height: "100vh" }}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box className={classes.dialogOverlay}>
      <Box className={classes.dialog}>
        <Box sx={{ mb: "10px" }}>
          <Typography
            variant="h6"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {t("network_status_dialog.title")}
          </Typography>
        </Box>
        <Box sx={{ mb: "10px" }}>
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {t("network_status_dialog.content")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <DialogButton sx={{ width: "100px" }} onClick={handleRetry}>
            {t("network_status_dialog.try_again_button")}
          </DialogButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NetworkStatusDialog;
