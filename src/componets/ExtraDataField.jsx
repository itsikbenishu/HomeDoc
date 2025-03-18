import { TextField, Tooltip } from "@mui/material";
import { useIsEditMode } from "../hooks/useIsEditMode";
import { useFormikContext } from "formik";
import React from "react";

const ExtraDataField = ({ className, label, ...others }) => {
  const isEditMode = useIsEditMode();
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext();

  const displayValue =
    values[label] < 0 ? `${Math.abs(values[label])}-` : values[label];

  return (
    <Tooltip
      title={errors[label]}
      open={!!errors[label] && !!touched[label]}
      PopperProps={{
        modifiers: [{ name: "offset", options: { offset: [0, 3] } }],
      }}
      arrow
    >
      <TextField
        variant="outlined"
        id={label}
        name={label}
        className={className}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errors[label]}
        disabled={!isEditMode}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-error": {
              borderColor: "red",
            },
          },
        }}
        {...others}
      />
    </Tooltip>
  );
};

export default ExtraDataField;
