import React, { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  Toolbar,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
  AppBar,
  Slide,
  IconButton,
  Typography,
  ListItemButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useIsEditMode } from "../../../hooks/useIsEditMode";
import { useInputDirection } from "../../../hooks/useInputDirection";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExtraDataListDialog = ({ extraDataList, handleRemove }) => {
  const contrastTextColor = (theme) => theme.palette.secondary.contrastText;
  const mainTextColor = (theme) => theme.palette.secondary.main;

  const isEditMode = useIsEditMode();
  const { t, i18n } = useTranslation();
  const inputDirection = useInputDirection();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title={t("extra_data_list_dialog.additional_characteristics")}
        placement="bottom"
      >
        <ReadMoreIcon
          fontSize="medium"
          sx={{ verticalAlign: "middle" }}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        dir={i18n.language === "he" ? "rtl" : "ltr"}
        TransitionComponent={Transition}
        sx={{
          zIndex: 10000,
        }}
      >
        <Box
          sx={{
            bgcolor: mainTextColor,
            height: "100%",
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                {t("extra_data_list_dialog.additional")}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label={t("exit_aria_lable")}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List sx={{ bgcolor: mainTextColor }}>
            {extraDataList.map((entity) => (
              <React.Fragment key={`ListItem-${entity.id}`}>
                <ListItem
                  key={`ListItem-${entity.id}`}
                  sx={{ bgcolor: mainTextColor }}
                >
                  <ListItemText
                    key={`listItemText-characteristic-${entity.id}`}
                    dir={inputDirection(entity.value)}
                    primary={`${entity.characteristic}:`}
                    sx={{
                      color: contrastTextColor,
                      width: "30%",
                    }}
                  />
                  <ListItemText
                    key={`listItemText-value-${entity.id}`}
                    dir={inputDirection(entity.value)}
                    primary={`${entity.value}`}
                    sx={{
                      color: contrastTextColor,
                      width: "65%",
                    }}
                  />
                  {isEditMode && (
                    <ListItemButton
                      sx={{
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon
                        onClick={() => handleRemove(entity)}
                        fontSize="medium"
                        sx={{
                          color: contrastTextColor,
                          verticalAlign: "middle",
                        }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
                <Divider
                  key={`divider-${entity.id}`}
                  sx={{
                    bgcolor: contrastTextColor,
                  }}
                />
              </React.Fragment>
            ))}
            <>
              <Divider
                key="addDivider"
                sx={{
                  bgcolor: contrastTextColor,
                }}
              />
            </>
          </List>
        </Box>
      </Dialog>
    </>
  );
};

export default ExtraDataListDialog;
