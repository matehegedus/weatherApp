import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    cities: ["Tokyo", "Berlin", "London", "Sydney"],
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;
export default citiesSlice.reducer;
