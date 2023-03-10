import { createSlice } from "@reduxjs/toolkit";

export const temperatureSlice = createSlice({
  name: "temperature",
  initialState: {
    temperature: { format: "metric", display: "°C" },
  },
  reducers: {
    toggleTemperature: (state) => {
      if (state.temperature.format === "metric")
        state.temperature = { format: "imperial", display: "°F" };
      else state.temperature = { format: "metric", display: "°C" };
    },
  },
});

export const { toggleTemperature } = temperatureSlice.actions;
export default temperatureSlice.reducer;
