import React, { useState, useEffect } from "react";
import WeatherList from "./components/Weather/WeatherList";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/Weather/WeatherCard";
import { selectFavorites } from "./components/redux/selectors";
import Header from "./components/Header/Header";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import axios from "axios";
import { addToFavorites } from "./components/redux/slice";

const App = () => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const favorites = useSelector(selectFavorites);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    currentLocationWeather();
  }, []);

  const currentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                appid: "18431911169fef4afbe92c0ef62b8409",
                units: "metric",
              },
            }
          );
          const weatherData = response.data;
          setWeatherData(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  // const handleAddToFavorites = (cityData) => {
  //   // Uncomment the relevant lines to update the cities state
  //   // const cityIndex = cities.findIndex((city) => city.name === cityData.name);
  //   // if (cityIndex !== -1) {
  //   //   const updatedCities = [...cities];
  //   //   updatedCities[cityIndex] = {
  //   //     ...updatedCities[cityIndex],
  //   //     isFavorite: true,
  //   //   };
  //   //   setCities(updatedCities);
  //   //   dispatch(addToFavorites(cityData));
  //   // }

  //   setCities([...cities, cityData]);
  //   // dispatch(addToFavorites(cityData));
  // };

  // return (
  //   <I18nextProvider i18n={i18n}>
  //     <div className="container">
  //       <Header />
  //       <SearchBar cities={cities} />
  //       <WeatherCard />
  //       {favorites.length > 0 && <WeatherList cities={cities} />}
  //     </div>
  //   </I18nextProvider>
  // );

  return (
    <I18nextProvider i18n={i18n}>
      <div className="container">
        <Header />
        <SearchBar
          cities={cities}
          setCities={setCities}
          addToFavorites={addToFavorites}
        />
        {weatherData && <WeatherCard weatherData={weatherData} />}
        {favorites.length > 0 && <WeatherList cities={cities} />}
      </div>
    </I18nextProvider>
  );
};

export default App;
