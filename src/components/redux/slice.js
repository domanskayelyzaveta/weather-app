import { createSlice } from "@reduxjs/toolkit";
import { getWeatherThunk } from "./thunksAPI";

const initialState = {
  weather: [],
  dailyWeather: {},
  favorites: [],
  isLoading: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites: (state, action) => {
      const { index } = action.payload;
      state.favorites.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWeatherThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
        state.error = null;
      })
      .addCase(getWeatherThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
