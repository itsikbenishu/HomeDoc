import { useTranslation } from "react-i18next";
import { Typography, Button } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";

function ChangeLangButton({ handleClick }) {
  const { i18n } = useTranslation();

  const handleToggleLanguage = () => {
    const newLang = i18n.language === "en" ? "he" : "en";
    handleClick(newLang.toLowerCase());
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
        {i18n.language === "en" ? "EN" : "HE"}
      </Typography>
    </Button>
  );
}

export default ChangeLangButton;
