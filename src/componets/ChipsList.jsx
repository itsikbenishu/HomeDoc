import React, { useState } from "react";
import { Autocomplete, TextField, Chip, Box, Popover } from "@mui/material";
import { useIsEditMode } from "../hooks/useIsEditMode";

const ChipsList = ({
  className,
  items,
  firstChipsNumber = 4,
  maxChipLength = 12,
  options = [],
  handleChangeChips = () => {},
  handleDeleteChip = () => {},
  ...others
}) => {
  const isEditMode = useIsEditMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleChange = (e, newValues) => {
    const newValuePos = newValues.length - 1;
    const isNewChip =
      e.code === "Enter" &&
      newValues.indexOf(newValues[newValuePos]) === newValuePos;
    const isDeleteAll = e.type === "click";

    if (isNewChip || isDeleteAll) {
      handleChangeChips(newValues);
    }
  };

  const handleDelete = (value) => {
    handleDeleteChip(value);

    if (open && items.length === firstChipsNumber + 1) {
      setAnchorEl(null);
    }
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <Autocomplete
        multiple
        freeSolo
        fullWidth
        value={items}
        onChange={handleChange}
        className={className}
        options={options}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            inputProps={{
              ...params.inputProps,
              maxLength: maxChipLength,
            }}
          />
        )}
        renderTags={(values, getTagProps) => {
          const renderedTags = values
            .slice(0, firstChipsNumber)
            .map((value, index) => {
              const { key, onDelete, ...restTagProps } = getTagProps({ index });

              return (
                <Chip
                  key={`chip-${value}`}
                  label={value}
                  {...restTagProps}
                  onDelete={() => handleDelete(value)}
                  size="small"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                  }}
                />
              );
            });

          if (items.length > firstChipsNumber) {
            const { key, onDelete, ...restTagProps } = getTagProps(
              firstChipsNumber - 1
            );
            renderedTags.push(
              <Chip
                key="chip-more"
                label=" עוד "
                {...restTagProps}
                clickable
                onClick={handleOpenPopover}
                size="small"
                sx={{
                  marginLeft: 1,
                  "&:hover": {
                    color: (theme) => theme.palette.grey[600],
                  },
                }}
              />
            );
          }

          return renderedTags;
        }}
        disabled={!isEditMode}
        {...others}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ padding: 2 }}>
          {items.slice(firstChipsNumber).map((value, index) => (
            <Chip
              key={`chip-more-${index}`}
              label={value}
              onDelete={() => handleDelete(value)}
              size="small"
              sx={{
                margin: 0.3,
                color: (theme) => theme.palette.primary.main,
              }}
            />
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export default ChipsList;
