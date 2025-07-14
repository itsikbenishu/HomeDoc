import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import { Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  },
  paper: {
    borderRadius: 4,
    textAlign: "center",
    zIndex: "1001",
  },
}));

const MobileNativeSelectOptions = ({
  options,
  isOpen,
  setIsOpen,
  onSelect,
  selectedValue,
}) => {
  const classes = useStyles();

  if (!isOpen) return null;

  const handleChange = (e) => {
    onSelect(e.target.value);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handlePaperClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Box
      className={classes.overlay}
      sx={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleOverlayClick}
    >
      <Paper
        className={classes.paper}
        sx={(theme) => ({ bgcolor: "#333333", p: theme.spacing(2) })}
        elevation={6}
        onClick={handlePaperClick}
      >
        <FormControl component="fieldset">
          <RadioGroup value={selectedValue} onChange={handleChange}>
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                <FormControlLabel
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        pl: 0,
                        ml: "10px",
                        color:
                          selectedValue === option.value
                            ? "rgb(33, 150, 243)"
                            : "rgb(63, 81, 181)",
                        "&.Mui-checked": {
                          color: "rgb(33, 150, 243)",
                          "& .MuiSvgIcon-root": {
                            color: "rgb(33, 150, 243)",
                          },
                        },
                      }}
                    />
                  }
                  label={option.label}
                  sx={{
                    ml: 0,
                    pl: "10px",
                    color: "white",
                    "& .MuiFormControlLabel-label": {
                      color: "white",
                    },
                  }}
                />
                {index < options.length - 1 && (
                  <Divider
                    className={classes.divider}
                    sx={{ my: 0.5, bgcolor: "rgba(255, 255, 255, 0.12)" }}
                  />
                )}
              </React.Fragment>
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default MobileNativeSelectOptions;
