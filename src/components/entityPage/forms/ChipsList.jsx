import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Popover,
  Tooltip,
  debounce,
} from "@mui/material";
import { useIsEditMode } from "../../../hooks/useIsEditMode";

const ChipsList = ({
  className,
  currentChips,
  firstChipsNumber = 4,
  maxChipLength = 12,
  options = [],
  addAfterBlur = false,
  errorMessage = "",
  handleChangeChips = () => {},
  handleDeleteChip = () => {},
  ...others
}) => {
  const { t } = useTranslation();
  const isEditMode = useIsEditMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isInList, setIsInList] = useState(false);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleInputChange = debounce((e, newInputValue, reason) => {
    const isNewChip = !currentChips.includes(newInputValue);
    setIsInList(addAfterBlur && !isNewChip);
  }, 300);

  const handleChange = (e, newValues) => {
    const newValuePos = newValues.length - 1;
    const trimmedNewValue = newValues[newValuePos].trim();
    const isNewChip = newValues.indexOf(trimmedNewValue) === newValuePos;
    const isEnter = e.code === "Enter";
    const isDeleteAll = e.type === "click";
    const isBlur = e.type === "blur";

    if (isDeleteAll) {
      handleChangeChips(newValues);
    }

    const changedValues = [...newValues.slice(0, -1), trimmedNewValue];

    if (addAfterBlur && isBlur && isNewChip) {
      handleChangeChips(changedValues);
    } else {
      if (isNewChip && isEnter) {
        handleChangeChips(changedValues);
      }
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
        clearOnBlur={addAfterBlur}
        fullWidth
        value={currentChips}
        onChange={handleChange}
        onInputChange={handleInputChange}
        className={className}
        options={options}
        renderInput={(params) => (
          <Tooltip
            title={errorMessage}
            open={addAfterBlur && isEditMode && isInList}
            PopperProps={{
              modifiers: [{ name: "offset", options: { offset: [0, 3] } }],
            }}
            arrow
          >
            <TextField
              autoComplete="off"
              variant="outlined"
              error={addAfterBlur && isEditMode && isInList}
              {...params}
              inputProps={{
                ...params.inputProps,
                maxLength: maxChipLength,
              }}
            />
          </Tooltip>
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

          if (currentChips.length > firstChipsNumber) {
            const { key, onDelete, ...restTagProps } = getTagProps(
              firstChipsNumber - 1
            );
            renderedTags.push(
              <Chip
                key="chip-more"
                label={` ${t("more")} `}
                {...restTagProps}
                clickable
                onClick={handleOpenPopover}
                size="small"
                sx={{
                  ml: 1,
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
          {currentChips.slice(firstChipsNumber).map((value, index) => (
            <Chip
              key={`chip-more-${index}`}
              label={value}
              onDelete={() => handleDelete(value)}
              size="small"
              sx={{
                m: 0.3,
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
