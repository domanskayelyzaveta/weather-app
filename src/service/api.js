import axios from "axios";

const API_KEY = "18431911169fef4afbe92c0ef62b8409";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const $instance = axios.create({ baseURL: BASE_URL });

export const fetchWeather = async (query = "", units = "metric", cnt = 1) => {
  const { data } = await $instance.get("", {
    params: {
      q: query,
      cnt,
      units,
      appid: API_KEY,
    },
  });
  console.log(data);
  return data;
};
