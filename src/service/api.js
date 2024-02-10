import axios from "axios";

const API_KEY = "18431911169fef4afbe92c0ef62b8409";

const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const $instance = axios.create({ baseURL: BASE_URL });

export const fetchWeather = async (query = "", units = "metric", cnt = 18) => {
  const { data } = await $instance.get("", {
    params: {
      q: query,
      cnt,
      units,
      appid: API_KEY,
    },
  });
  return data;
};

export const fetchWeatherData = async (inputValue) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=18431911169fef4afbe92c0ef62b8409`
    );
    const data = await response.json();
    return data.map((city) => ({
      value: `${city.name}, ${city.country}`,
      label: `${city.name}, ${city.country}`,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
