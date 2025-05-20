import { useState } from "react";
import { Input, InputAdornment } from "@mui/material";
import MobileNativeSelectOptions from "../componets/MobileNativeSelectOptions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MobileNativeSelect = ({
  value = "",
  onChange = () => {},
  options = [],
  ...others
}) => {
  const [clicked, setClicked] = useState(false);

  const handleOptionSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setClicked(false);
  };

  return (
    <>
      <Input
        onClick={() => setClicked(true)}
        value={options.find((opt) => opt.value === value)?.label}
        readOnly
        endAdornment={
          <InputAdornment
            position="end"
            sx={{
              position: "absolute",
              top: "50%",
              right: "8px",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "grey",
            }}
          >
            <ArrowDropDownIcon color="action" sx={{ pointerEvents: "none" }} />
          </InputAdornment>
        }
        sx={{
          cursor: "pointer",
          width: "100%",
        }}
        {...others}
      />
      <MobileNativeSelectOptions
        options={options}
        isOpen={clicked}
        setIsOpen={setClicked}
        onSelect={handleOptionSelect}
        selectedValue={value}
      />
    </>
  );
};

export default MobileNativeSelect;
