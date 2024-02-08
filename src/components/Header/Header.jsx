import React from "react";
import Select from "react-select";

import sprite from "../../images/sprite.svg";
import { HeaderWrapper, StyledSvg } from "./Header.styled";

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
  const userLanguage = (navigator.language || navigator.userLanguage).split(
    "-"
  )[0];
  const options = [
    { value: "en", label: "EN" },
    { value: "ua", label: "UA" },
    { value: "he", label: "HE" },
    { value: userLanguage, label: userLanguage.toUpperCase() },
  ];
  const defaultValue = options.find((option) => option.value === userLanguage);

  return (
    <HeaderWrapper>
      <StyledSvg>
        <use href={`${sprite}#globe`} />
      </StyledSvg>
      <Select
        options={options}
        defaultValue={defaultValue}
        styles={customStyles}
      />
    </HeaderWrapper>
  );
};

export default Header;
