import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherThunk } from "../redux/thunksAPI";
import WeatherCard from "../Weather/WeatherCard";
import { addToFavorites } from "../redux/slice";
import { selectWeather } from "../redux/selectors";
import { nanoid } from "nanoid";
import { SearchBarWrapper, StyledAddBtn } from "./SearchBar.styled";
import { AsyncPaginate } from "react-select-async-paginate";

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityFromSearch, setSelectedCityFromSearch] = useState(null);

  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeather);

  useEffect(() => {
    if (selectedCity) {
      dispatch(getWeatherThunk(selectedCity.label));
    }
  }, [dispatch, selectedCity]);

  const loadOptions = async (inputValue, loadedOptions) => {
    if (inputValue.trim() === "") {
      return { options: [] };
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=18431911169fef4afbe92c0ef62b8409`
      );
      const data = await response.json();
      const options = data.map((city) => ({
        value: `${city.name}, ${city.country}`,
        label: `${city.name}, ${city.country}`,
      }));
      return { options };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { options: [] };
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleAddClick = () => {
    if (selectedCity) {
      dispatch(addToFavorites(weatherData));
      setSelectedCity(null);
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
          {selectedCityFromSearch && (
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
