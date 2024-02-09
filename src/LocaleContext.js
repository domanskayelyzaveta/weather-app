// LangContext.js
import React, { createContext, useState } from "react";

const LangContext = createContext();

const LangProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  return (
    <LangContext.Provider value={{ locale, setLocale }}>
      {children}
    </LangContext.Provider>
  );
};

export { LangContext, LangProvider };
