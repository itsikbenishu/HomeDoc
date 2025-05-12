import React, { useState } from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import { Typography, Button } from "@mui/material";

function ChangeLangButton({ handleClick }) {
  const [language, setLanguage] = useState("EN");

  const handleToggleLanguage = () => {
    const newLang = language === "EN" ? "HE" : "EN";
    handleClick(newLang.toLowerCase());
    setLanguage(newLang);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleToggleLanguage}
      startIcon={<TranslateIcon />}
      sx={{ "& .MuiButton-startIcon": { m: 0.5 } }}
    >
      <Typography variant="button">
        {language === "EN" ? "EN" : "HE"}
      </Typography>
    </Button>
  );
}

export default ChangeLangButton;
