import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../../service/api";
import { toast } from "react-toastify";

export const getWeatherThunk = createAsyncThunk(
  "weather/weatherThunk",
  async (query, thunkAPI) => {
    try {
      const response = await fetchWeather(query);
      return response;
    } catch (error) {
      toast.error("Failed request");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
