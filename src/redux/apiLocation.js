import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLocation = createAsyncThunk(
  "location/fetch",
  async (position, thunkAPI) =>
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=2`
    ).then((r) => r.json())
);

export const apiLocationSlice = createSlice({
  name: "location",
  initialState: {
    place: "London",
  },
  reducers: {
    setLocation: (state, action) => {
      state.place = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.place = action.payload.address.country;
      })
      .addCase(fetchLocation.rejected, (state) => {
        alert("Could not fetch location");
      });
  },
});

export default apiLocationSlice.reducer;
export const { setLocation } = apiLocationSlice.actions;
