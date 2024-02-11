import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";

import sprite from "../../images/sprite.svg";
import { HeaderWrapper, StyledSvg } from "./Header.styled";
import { useTranslation } from "react-i18next";

const customStyles = {
  menu: (provided) => ({
    ...provided,
    width: "72px",
  }),
  control: (provided, state) => ({
    ...provided,
    padding: "0px",
    width: "50px",
    border: "none",
    boxShadow: state.isFocused ? null : "none",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  option: (provided) => ({
    ...provided,
    width: "72px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    transition: "transform 0.3s ease-in-out",
    padding: "0px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#AFAFAF",
    width: "40px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0px",
  }),
};

const Header = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const localStorageRef = useRef(localStorage);

  useEffect(() => {
    const languageFromStorage = localStorageRef.current.getItem("i18next_lng");
    if (languageFromStorage) {
      setSelectedLanguage({
        value: languageFromStorage,
        label: languageFromStorage.toUpperCase(),
      });
    } else {
      const userLanguage = (navigator.language || navigator.userLanguage).split(
        "-"
      )[0];
      setSelectedLanguage({
        value: userLanguage,
        label: userLanguage.toUpperCase(),
      });
    }
  }, []);

  useEffect(() => {
    const languageFromStorage = localStorageRef.current.getItem("i18next_lng");
    if (
      languageFromStorage &&
      (!selectedLanguage || languageFromStorage !== selectedLanguage.value)
    ) {
      setSelectedLanguage({
        value: languageFromStorage,
        label: languageFromStorage.toUpperCase(),
      });
    }
  }, [selectedLanguage]);

  const handleChangeLanguage = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    i18n.changeLanguage(selectedOption.value);
    localStorageRef.current.setItem("i18next_lng", selectedOption.value);
  };

  const options = [
    { value: "en", label: "EN" },
    { value: "ua", label: "UA" },
    { value: "he", label: "HE" },
  ];

  return (
    <HeaderWrapper>
      <StyledSvg>
        <use href={`${sprite}#globe`} />
      </StyledSvg>
      <Select
        options={options}
        onChange={handleChangeLanguage}
        value={selectedLanguage}
        styles={customStyles}
      />
    </HeaderWrapper>
  );
};

export default Header;
