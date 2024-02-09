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
      Rain: "Rain",
      selectLanguage: "Select Language:",
      shortDays: {
        Mon: "Mon",
        Tue: "Tue",
        Wed: "Wed",
        Thu: "Thu",
        Fri: "Fri",
        Sat: "Sat",
        Sun: "Sun",
      },
      longMonths: {
        January: "Jan",
        February: "Feb",
        March: "Mar",
        April: "Apr",
        May: "May",
        June: "Jun",
        July: "Jul",
        August: "Aug",
        September: "Sep",
        October: "Oct",
        November: "Nov",
        December: "Dec",
      },
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
      Rain: "Дощ",
      selectLanguage: "Select Language:",
      shortDays: {
        Mon: "Пн",
        Tue: "Вт",
        Wed: "Ср",
        Thu: "Чт",
        Fri: "Пт",
        Sat: "Сб",
        Sun: "Нд",
      },
      longMonths: {
        January: "Січ",
        February: "Лют",
        March: "Бер",
        April: "Кві",
        May: "Тра",
        June: "Чер",
        July: "Лип",
        August: "Сер",
        September: "Вер",
        October: "Жов",
        November: "Лис",
        December: "Гру",
      },
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
      Rain: "גשם",
      selectLanguage: "Select Language:",
      shortDays: {
        Mon: "ב׳",
        Tue: "ג׳",
        Wed: "ד׳",
        Thu: "ה׳",
        Fri: "ו׳",
        Sat: "ש׳",
        Sun: "א׳",
      },
      longMonths: {
        January: "תשרי",
        February: "חשוון",
        March: "כסלו",
        April: "טבת",
        May: "שבט",
        June: "אדר",
        July: "ניסן",
        August: "אייר",
        September: "סיוון",
        October: "תמוז",
        November: "אב",
        December: "אלול",
      },
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
