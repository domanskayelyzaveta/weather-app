import React, { useState, useEffect } from "react";
import WeatherList from "./components/Weather/WeatherList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/Weather/WeatherCard";
import { selectFavorites } from "./components/redux/selectors";
import Header from "./components/Header/Header";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import axios from "axios";
import { addToFavorites } from "./components/redux/slice";
import Loader from "./components/Loader/Loader";

const App = () => {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    currentLocationWeather();
  }, []);

  const currentLocationWeather = () => {
    setIsLoading(true);
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
          setLocation({ latitude, longitude });
        } catch (error) {
          toast.error("Error fetching weather data:", error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        toast.error("Access to geolocation is prohibited:", error);
        setIsLoading(false);
      }
    );
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="container">
        <Header />
        <SearchBar
          cities={cities}
          setCities={setCities}
          addToFavorites={addToFavorites}
          location={location}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {weatherData && <WeatherCard weatherData={weatherData} />}
            {favorites.length > 0 && <WeatherList cities={cities} />}
            <ToastContainer position="top-center" autoClose={3000} />
          </>
        )}
      </div>
    </I18nextProvider>
  );
};

export default App;
