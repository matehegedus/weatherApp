import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: "en",
  },
  reducers: {
    toggleLanguage: (state) => {
      if (state.language === "en") state.language = "de";
      else state.language = "en";
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
