import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";

const resources = {
  en: {
    translation: {
      feels_like: "Feels like",
      wind: "Wind",
      humidity: "Humidity",
      pressure: "Pressure",
      add: "Add",
      Sunny: "Sunny",
      Clouds: "Clouds",
      selectLanguage: "Select Language:",
    },
  },
  ua: {
    translation: {
      feels_like: "Відчувається як",
      wind: "Вітер",
      humidity: "Вологість",
      pressure: "Тиск",
      add: "Додати",
      Sunny: "Ясно",
      Clouds: "Хмарно",
      selectLanguage: "Select Language:",
    },
  },
  he: {
    translation: {
      feels_like: "נראה כמו",
      wind: "רוח",
      humidity: "לחות",
      pressure: "לחץ",
      add: "הוסף",
      Sunny: "שמשי",
      Clouds: "מעונן",
      selectLanguage: "Select Language:",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(LocalStorageBackend)
  .init({
    resources,
    lng: localStorage.getItem("i18next_lng") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      keySeparator: false,
      prefix: "i18next_",
    },
  });

export default i18n;
