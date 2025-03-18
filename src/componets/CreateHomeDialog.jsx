import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { createHomeDoc } from "../slices/HomeDocSlice";
import { HOME_DOC_CATEGORIES } from "../Constants";
import DialogButton from "./DialogButton";

const useStyles = makeStyles(() => ({
  iconButton: {
    height: "2.7rem",
    display: "flex",
    backgroundColor: "white",
    marginTop: 2,
    borderRadius: 4,
    ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
      borderRadius: 4,
    },
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
  input: {
    display: "flex",
    marginTop: 2,
    "& .MuiInputBase-input": {
      borderRadius: 4,
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
      <FormControl sx={{ mt: 3, ml: 1, bgcolor: "white" }} variant="standard">
        <IconButton onClick={handleClickOpen} className={classes.iconButton}>
          <AddBusinessIcon />
        </IconButton>
      </FormControl>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="create-dialog-title"
        aria-describedby="create-dialog-description"
      >
        <DialogTitle>צור תיעוד מבנה</DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ marginBottom: "0.5rem", marginTop: "-0.25rem" }}
          >
            כדי לצור תיעוד ביתי, אנא הזן את הכתובת של המבנה ואת סוג המבנה אותו
            אתה מתעד.
          </DialogContentText>
          <Stack spacing={1}>
            <FormControl variant="standard">
              <InputBase
                value={address}
                onChange={handleAddressChange}
                className={classes.input}
                placeholder="כתובת"
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
                  סוג
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
        <DialogActions>
          <DialogButton onClick={handleClose}>ביטול</DialogButton>
          <DialogButton
            onClick={handleCreate}
            disabled={!(category && address)}
          >
            אישור
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateHomeDialog;
