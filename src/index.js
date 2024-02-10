import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  supportedLngs: ["en", "ua", "he"],
  fallbackLng: "en",
  detection: {
    order: ["cookie", "localStorage", "htmlTag", "path", "subdomain"],
    caches: ["localStorage"],
  },
  backend: {
    loadPath: "./../public/assets/languages/{{lng}}/translation.json",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </I18nextProvider>
    </React.StrictMode>
  </Provider>
);
