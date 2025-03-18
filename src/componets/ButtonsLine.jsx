import React from "react";
import { Box, Fab, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import ConfirmDialog from "./ConfirmDialog";

const StyledFab = styled(Fab)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  width: theme.spacing(4.8),
  height: theme.spacing(4.5),
  margin: theme.spacing(0.5),
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  "&:hover": {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
    color: theme.palette.secondary.contrastText,
  },
}));
const ButtonsLine = ({ buttons, lineStyle }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentDialog, setCurrentDialog] = React.useState(null);

  const handleConfirm = () => {
    currentDialog.onConfirm();
    setIsDialogOpen(false);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box style={lineStyle}>
      {buttons.map((button) => (
        <React.Fragment key={button.key}>
          <Tooltip title={button.label} placement="bottom">
            <StyledFab
              color="secondary"
              onClick={() => {
                if (button.dialog) {
                  setIsDialogOpen(true);
                  setCurrentDialog(button.dialog);
                } else {
                  button.onClick();
                }
              }}
              disabled={isDialogOpen}
            >
              {button.iconComponent}
            </StyledFab>
          </Tooltip>

          {button.dialog && isDialogOpen && (
            <ConfirmDialog
              dialog={currentDialog.message}
              onConfirm={handleConfirm}
              onClose={handleClose}
              isOpen={isDialogOpen}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ButtonsLine;
