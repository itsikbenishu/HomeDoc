import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationHE from "./locales/he/translation.json";
import translationEN from "./locales/en/translation.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: translationHE },
      en: { translation: translationEN },
    },
    lng: "en",
    fallbackLng: "he",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
