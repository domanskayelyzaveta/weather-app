import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { fetchDailyWeather, fetchWeather } from "../../service/api";

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

// export const getDailyWeatherThunk = createAsyncThunk(
//   "weather/dailyWeatherThunk",
//   async (query, thunkAPI) => {
//     try {
//       const response = await fetchDailyWeather(query);
//       console.log("RESPONSE1:", response);
//       return response;
//     } catch (error) {
//       toast.error("Incorrect name");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
