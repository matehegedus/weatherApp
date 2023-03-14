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
    requestId: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.weatherInfo = action.payload.list.slice(0, forecastCnt);
      })
      .addCase(fetchWeather.pending, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          state.requestId = action.meta.requestId;
        }
      })
      .addCase(fetchWeather.rejected, (state) => {
        alert("Could not fetch weather data");
        state.weatherInfo = undefined;
      });
  },
});

export default apiWeatherSlice.reducer;
