import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Stack,
  IconButton,
  InputBase,
  FormControl,
  NativeSelect,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { createHomeDoc } from "../../../slices/HomeDocSlice";
import DialogButton from "../../common/DialogButton";
import { useTranslatedConstants } from "../../../hooks/useTranslatedConstants";

const useStyles = makeStyles(() => ({
  iconButton: {
    height: "2.7rem",
    display: "flex",
    backgroundColor: "white",
    marginTop: 2,
    borderRadius: 8,
    ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
      borderRadius: 8,
    },
    "&:hover": {
      borderRadius: 8,
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      "&:active": {
        borderRadius: 8,
        border: "1px solid #80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
  input: {
    display: "flex",
    marginTop: 2,
    "& .MuiInputBase-input": {
      borderRadius: 8,
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 12px",
      "&:focus": {
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
}));

const CreateHomeDialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { HOME_DOC_CATEGORIES } = useTranslatedConstants();
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setAddress("");
    setCategory("");
    setOpenDialog(false);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCreate = (event) => {
    event.preventDefault();

    dispatch(
      createHomeDoc({
        interiorEntityKey: address,
        category: category,
        type: "PROPERTY",
      })
    );

    setOpenDialog(false);
  };

  return (
    <>
      <FormControl
        sx={{
          mt: 3,
          bgcolor: (theme) => theme.palette.primary.contrastText,
          borderRadius: 2,
        }}
        variant="standard"
      >
        <IconButton onClick={handleClickOpen} className={classes.iconButton}>
          <AddBusinessIcon />
        </IconButton>
      </FormControl>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        dir={i18n.language === "he" ? "rtl" : "ltr"}
      >
        <DialogTitle>{t("create_home_dialog.title")}</DialogTitle>
        <DialogContent
          sx={{
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            },
            color: "text.primary",
            mb: 2,
          }}
        >
          <DialogContentText
            sx={{
              mb: 0.5,
              mt: -0.25,
            }}
          >
            {t("create_home_dialog.content")}
          </DialogContentText>
          <Stack spacing={1}>
            <FormControl variant="standard">
              <InputBase
                value={address}
                onChange={handleAddressChange}
                className={classes.input}
                placeholder={t("create_home_dialog.address_placeholder")}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </FormControl>
            <FormControl variant="standard">
              <NativeSelect
                value={category}
                onChange={handleCategoryChange}
                className={classes.input}
                fullWidth
              >
                <option aria-label="None" value="">
                  {t("create_home_dialog.type_option")}
                </option>
                {Object.entries(HOME_DOC_CATEGORIES).map(
                  ([category, categoryText]) => (
                    <option key={category} value={category}>
                      {categoryText}
                    </option>
                  )
                )}
              </NativeSelect>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ gap: 1.1, mx: 1 }}>
          <DialogButton onClick={handleClose}>
            {t("create_home_dialog.cancel")}
          </DialogButton>
          <DialogButton
            onClick={handleCreate}
            disabled={!(category && address)}
          >
            {t("create_home_dialog.comfirm")}
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateHomeDialog;
