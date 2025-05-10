import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  Toolbar,
  Tooltip,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  AppBar,
  Slide,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { HOME_DOC_PAGE_TYPE } from "../../Constants";
import CreateSubHomeDialog from "./CreateSubHomeDialog";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SubEntitiesDialog = ({
  subEntityPreName,
  subEntitesName,
  subEntitiesList,
  entityType,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemClick = (loc) => {
    navigate(loc);
  };

  return (
    <>
      <Tooltip title={`עוד ${subEntitesName}`} placement="bottom">
        <MoreHorizRoundedIcon
          fontSize="small"
          sx={{ verticalAlign: "middle" }}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ bgcolor: (theme) => theme.palette.primary.main }}
      >
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            height: "100vh",
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                {subEntitesName}
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
            {subEntitiesList.map((subEntity) => (
              <React.Fragment key={`listItemButton-${subEntity.id}`}>
                <ListItemButton
                  key={`listItemButton-${subEntity.id}`}
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.main,
                    "&:hover": {
                      bgcolor: "#133365",
                    },
                  }}
                  onClick={() =>
                    handleItemClick(
                      `/Results/${HOME_DOC_PAGE_TYPE[subEntity.type]}/${
                        subEntity.id
                      }`
                    )
                  }
                >
                  <ListItemText
                    key={`listItemText-${subEntity.id}`}
                    primary={`${subEntityPreName}${subEntity.interiorEntityKey}`}
                    secondary={
                      <span style={{ color: "white" }}>
                        {subEntity?.description}
                      </span>
                    }
                    sx={{
                      textAlign: "right",
                      color: (theme) => theme.palette.primary.contrastText,
                    }}
                  />
                </ListItemButton>
                <Divider
                  key={`divider-${subEntity.id}`}
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.contrastText,
                  }}
                />
              </React.Fragment>
            ))}
            <Box sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
              <CreateSubHomeDialog
                homeDocType={entityType}
                isExpaned={true}
              ></CreateSubHomeDialog>
              <Divider
                key="addDivider"
                sx={{ bgcolor: (theme) => theme.palette.primary.contrastText }}
              />
            </Box>
          </List>
        </Box>
      </Dialog>
    </>
  );
};

export default SubEntitiesDialog;
