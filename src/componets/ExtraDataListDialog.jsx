import React, { forwardRef, useState } from "react";
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
import { useIsEditMode } from "../hooks/useIsEditMode";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExtraDataListDialog = ({ extraDataList, handleRemove }) => {
  const contrastTextColor = (theme) => theme.palette.primary.contrastText;
  const isEditMode = useIsEditMode();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="תכונות נוספות" placement="bottom">
        <ReadMoreIcon
          fontSize="medium"
          style={{ verticalAlign: "middle" }}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          zIndex: 10000,
        }}
      >
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            height: "100%",
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                מידע נוסף:
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="יציאה"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <List>
            {extraDataList.map((entity) => (
              <React.Fragment key={`ListItem-${entity.id}`}>
                <ListItem key={`ListItem-${entity.id}`}>
                  <ListItemText
                    key={`listItemText-characteristic-${entity.id}`}
                    primary={`${entity.characteristic}:`}
                    sx={{
                      textAlign: "right",
                      color: contrastTextColor,
                      width: "30%",
                    }}
                  />
                  <ListItemText
                    key={`listItemText-value-${entity.id}`}
                    primary={`${entity.value}`}
                    sx={{
                      textAlign: "right",
                      color: contrastTextColor,
                      width: "65%",
                    }}
                  />
                  {isEditMode && (
                    <ListItemButton edge="end" aria-label="delete">
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
