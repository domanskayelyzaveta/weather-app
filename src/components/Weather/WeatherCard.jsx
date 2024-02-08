// import React from "react";
import { useSelector } from "react-redux";
import { selectWeather } from "../redux/selectors";

const WeatherCard = ({ weatherData }) => {
  console.log("CARD:", weatherData);
  const weather = useSelector(selectWeather);
  const cityName = weather?.city?.name;

  if (
    !weatherData ||
    !weatherData.main ||
    !weatherData.weather ||
    !weatherData.wind
  ) {
    return;
  }

  return (
    <div>
      <h3>Name:{cityName}</h3>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Feels like: {weatherData.main.feels_like} °C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>
        Wind Speed: {weatherData.wind.speed} m/s, Direction:{" "}
        {weatherData.wind.deg}°
      </p>
    </div>
  );
};

export default WeatherCard;
