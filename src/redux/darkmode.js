import { createSlice } from "@reduxjs/toolkit";

export const darkmodeSlice = createSlice({
  name: "darkmode",
  initialState: {
    darkmode: true,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkmode = !state.darkmode;
    },
    setDarkMode: (state) => {
      state.darkmode = true;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
