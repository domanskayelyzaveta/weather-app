import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { fetchWeather } from "../../service/api";

export const getWeatherThunk = createAsyncThunk(
  "weather/weatherThunk",
  async (query, thunkAPI) => {
    try {
      const response = await fetchWeather(query);
      return response;
    } catch (error) {
      toast.error("Incorrect name");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
