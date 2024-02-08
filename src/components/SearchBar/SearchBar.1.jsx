import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherThunk } from "../redux/thunksAPI";
import WeatherCard from "../Weather/WeatherCard";
import { addToFavorites } from "../redux/slice";
import { selectFavorites, selectWeather } from "../redux/selectros";
import { nanoid } from "nanoid";

export const SearchBar = ({ onAddToFavorites }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeather);
  const favorites = useSelector(selectFavorites);
  console.log("weatherData::", weatherData);

  useEffect(() => {
    dispatch(getWeatherThunk(searchTerm));
  }, [dispatch, searchTerm]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=18431911169fef4afbe92c0ef62b8409`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (selectedCity) {
        console.log("Show weather card for selected city:", selectedCity);
      } else {
        console.log("Show city list");
      }
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchResults([]);
  };

  const handleAddClick = () => {
    if (selectedCity) {
      onAddToFavorites(selectedCity.name);
      dispatch(addToFavorites(selectedCity));
      setSelectedCity(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type a city name..."
      />
      <div>
        {/* {loading && <p>Loading...</p>} */}
        {/* {!loading && searchResults.length === 0 && <p>No results found.</p>} */}
        {searchResults?.map((city) => (
          <div key={nanoid()} onClick={() => handleCitySelect(city)}>
            {city.name}
          </div>
        ))}
        {selectedCity && (
          <WeatherCard
            key={nanoid()}
            city={selectedCity.name}
            temperature={selectedCity.temperature}
            wind={selectedCity.wind}
            humidity={selectedCity.humidity}
          />
        )}
        <button onClick={handleAddClick}>Add</button>
      </div>

      <div>
        <ul>
          {/* {favorites?.map((favorite, index) => (
              <li key={index}>
                <WeatherCard key={nanoid()} city={favorite} />
              </li>
            ))} */}
          {selectedCity && (
            <div>
              {weatherData?.list.map((weatherDataItem, index) => (
                <WeatherCard key={index} weatherData={weatherDataItem} />
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
