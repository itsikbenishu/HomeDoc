import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  InputBase,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { SUB_HOME_DOC_KEY, SUB_HOME_DOC_TYPE } from "../Constants";
import {
  createSubHomeDoc,
  selectHomeDocEntityCategory,
  selectHomeDocsubEntities,
  selectHomeDocInteriorEntityKey,
} from "../slices/HomeDocSlice";
import { useIsEditMode } from "../hooks/useIsEditMode";
import DialogButton from "./DialogButton";

const useStyles = makeStyles(() => ({
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
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
}));

const CreateSubHomeDialog = ({
  homeDocType = "ROOM",
  dialogContentText = "",
  isExpaned = false,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const subEntities = useSelector(selectHomeDocsubEntities);
  const fatherInteriorEntityKey = useSelector(selectHomeDocInteriorEntityKey);
  const category = useSelector(selectHomeDocEntityCategory);
  const [openDialog, setOpenDialog] = useState(false);
  const [subHomeDocKey, setSubHomeDocKey] = useState("");
  const isEditMode = useIsEditMode();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setSubHomeDocKey("");
    setOpenDialog(false);
  };

  const fatherId = useParams().id;
  const handleSubHomeDocKeyChange = ({ target }) => {
    setSubHomeDocKey(target.value);
  };

  const handleCreate = (event) => {
    event.preventDefault();

    dispatch(
      createSubHomeDoc({
        subHomeDocInfo: {
          fatherId: fatherId,
          fatherInteriorEntityKey: fatherInteriorEntityKey,
          subHomedocsIds: subEntities,
          newHomeDoc: {
            interiorEntityKey: subHomeDocKey,
            type: homeDocType.includes("ROOM_")
              ? `ROOM_${SUB_HOME_DOC_TYPE[category][homeDocType]}`
              : SUB_HOME_DOC_TYPE[category][homeDocType],
            category: category,
          },
        },
      })
    );
  };

  return (
    <>
      {isExpaned
        ? !isEditMode && (
            <>
              <ListItemButton autoFocus onClick={handleClickOpen}>
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="הוסף"
                  secondary={<span style={{ color: "white" }}></span>}
                  sx={{ textAlign: "right", color: "white" }}
                />
              </ListItemButton>
            </>
          )
        : !isEditMode && (
            <Tooltip title="הוסף" placement="bottom">
              <AddBoxRoundedIcon
                onClick={handleClickOpen}
                fontSize="small"
                style={{ verticalAlign: "middle" }}
              />
            </Tooltip>
          )}
      <Dialog open={openDialog} onClose={handleClose} dir="rtl">
        <DialogTitle>צור</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: 10 }}>
            {dialogContentText === ""
              ? `לצורך הרחבת התיעוד הביתי, אנא הזן את ${SUB_HOME_DOC_KEY[SUB_HOME_DOC_TYPE[category][homeDocType]]} אשר הוחלט לתעד.`
              : dialogContentText}
          </DialogContentText>
          <Stack spacing={1}>
            <FormControl variant="standard">
              <InputBase
                value={subHomeDocKey}
                onChange={handleSubHomeDocKeyChange}
                className={classes.input}
                placeholder={
                  SUB_HOME_DOC_KEY[SUB_HOME_DOC_TYPE[category][homeDocType]]
                }
                inputProps={{ maxLength: 50 }}
                fullWidth
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <DialogButton onClick={handleClose}>ביטול</DialogButton>
          <DialogButton disabled={!subHomeDocKey} onClick={handleCreate}>
            אישור
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateSubHomeDialog;
