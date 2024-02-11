import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

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
