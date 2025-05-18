import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import {
  createSubHomeDoc,
  selectHomeDocEntityCategory,
  selectHomeDocsubEntities,
  selectHomeDocInteriorEntityKey,
} from "../slices/HomeDocSlice";
import { useIsEditMode } from "../hooks/useIsEditMode";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import { useInputDirection } from "../hooks/useInputDirection";
import { SUB_HOME_DOC_TYPE } from "../../Constants";
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
  const { t, i18n } = useTranslation();
  const subEntities = useSelector(selectHomeDocsubEntities);
  const fatherInteriorEntityKey = useSelector(selectHomeDocInteriorEntityKey);
  const category = useSelector(selectHomeDocEntityCategory);
  const [openDialog, setOpenDialog] = useState(false);
  const [subHomeDocKey, setSubHomeDocKey] = useState("");
  const { SUB_HOME_DOC_KEY } = useTranslatedConstants();
  const inputDirection = useInputDirection();
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
        fatherId: fatherId,
        subHomeDocInfo: {
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
                  primary={t("add")}
                  secondary={<span style={{ color: "white" }}></span>}
                  sx={{
                    color: (theme) => theme.palette.primary.contrastText,
                  }}
                />
              </ListItemButton>
            </>
          )
        : !isEditMode && (
            <Tooltip title={t("more")} placement="bottom">
              <AddBoxRoundedIcon
                onClick={handleClickOpen}
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
            </Tooltip>
          )}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{t("create_sub_home_dialog.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {dialogContentText === ""
              ? `${t("create_sub_home_dialog.content_reason")} ${
                  SUB_HOME_DOC_KEY[SUB_HOME_DOC_TYPE[category][homeDocType]]
                } ${t("create_sub_home_dialog.content_which")}`
              : dialogContentText}
          </DialogContentText>
          <Stack spacing={1}>
            <FormControl variant="standard">
              <InputBase
                value={subHomeDocKey}
                onChange={handleSubHomeDocKeyChange}
                aria-label={t("exit_aria_lable")}
                className={classes.input}
                placeholder={
                  SUB_HOME_DOC_KEY[SUB_HOME_DOC_TYPE[category][homeDocType]]
                }
                inputProps={{
                  maxLength: 20,
                  dir: inputDirection(subHomeDocKey),
                }}
                fullWidth
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ gap: 1.1, mx: 1 }}>
          <DialogButton onClick={handleClose}>
            {t("create_sub_home_dialog.cancel")}
          </DialogButton>
          <DialogButton disabled={!subHomeDocKey} onClick={handleCreate}>
            {t("create_sub_home_dialog.comfirm")}
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateSubHomeDialog;
