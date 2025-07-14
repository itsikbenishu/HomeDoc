import { useTranslation } from "react-i18next";

export const useInputDirection = () => {
  const { i18n } = useTranslation();

  return (value) => {
    if (value === "") {
      return i18n.language === "he" ? "rtl" : "ltr";
    }

    const isNumeric = /^-?\d+(\.\d+)?$/.test(value.trim());

    if (isNumeric) {
      return "ltr";
    }

    return i18n.language === "he" ? "rtl" : "ltr";
  };
};
