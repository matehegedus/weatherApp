import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const forecastCnt = 5;

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async ({ language, temperature, place }, ThunkAPI) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${place}&lang=${language}&units=${temperature.format}&appid=367bdb142487f1eab5161819e6741062`
    ).then((resp) => resp.json())
);

export const apiWeatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherInfo: [],
  },
  reducers: {},
  extraReducers: {
    [fetchWeather.fulfilled]: (state, action) => {
      console.log("fetched");
      state.weatherInfo = action.payload.list.slice(0, forecastCnt);
    },
    [fetchWeather.pending]: (state) => {
      console.log("pending");
    },
    [fetchWeather.rejected]: (state) => {
      console.log("rejected :>> ", state);
      alert("Could not fetch weather data");
      state.weatherInfo = undefined;
    },
  },
});

export default apiWeatherSlice.reducer;
