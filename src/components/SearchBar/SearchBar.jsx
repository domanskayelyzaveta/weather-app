import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherThunk } from "../redux/thunksAPI";
import WeatherCard from "../Weather/WeatherCard";
import { addToFavorites } from "../redux/slice";
import { selectFavorites, selectWeather } from "../redux/selectors";
import { nanoid } from "nanoid";
import { SearchBarWrapper, StyledAddBtn } from "./SearchBar.styled";
import { AsyncPaginate } from "react-select-async-paginate";
import { fetchWeatherData } from "../../service/api";

const SearchBar = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const dispatch = useDispatch();

  const weatherData = useSelector(selectWeather);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    if (selectedCity) {
      dispatch(getWeatherThunk(selectedCity.label));
    }
  }, [dispatch, selectedCity]);

  const loadOptions = async (inputValue) => {
    if (inputValue.trim() === "") {
      return { options: [] };
    }

    try {
      setLoading(true);
      const options = await fetchWeatherData(inputValue);
      return { options };
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleAddClick = () => {
    if (selectedCity) {
      const isCityAlreadyAdded = favorites.some(
        (favorite) =>
          favorites[0]?.city?.name + ", " + favorites[0].city?.country ===
          selectedCity?.value
      );
      if (isCityAlreadyAdded) {
        toast.info("This city is already in favorites");
      } else {
        dispatch(addToFavorites(weatherData));
        setSelectedCity(null);
        toast.success("Weather card successfully added to favorites");
      }
    } else {
      toast.info("Please select a city before adding");
    }
  };

  return (
    <div>
      <SearchBarWrapper>
        <AsyncPaginate
          value={selectedCity}
          loadOptions={loadOptions}
          onChange={handleCitySelect}
          isClearable={true}
          isLoading={loading}
          placeholder="Type a city name..."
          styles={customStyles}
        />
        <StyledAddBtn onClick={handleAddClick}>Add</StyledAddBtn>
      </SearchBarWrapper>

      <div>
        <ul>
          {(!location || location === "") && (
            <div>
              {weatherData?.list?.slice(0, 1).map((weatherDataItem) => (
                <WeatherCard key={nanoid()} weatherData={weatherDataItem} />
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;

// * Styles //

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#00ff00" : "#cccccc",
    backgroundColor: "#FFFFFF",
    backgroundPosition: "0% 0%",
    backgroundRepeat: "no-repeat",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "5px",
    border: "none",
    width: "659px",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#666666" : "inherit",
    backgroundColor: state.isFocused ? "#F2F2F2" : "inherit",
  }),
};
