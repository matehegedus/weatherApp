import { configureStore } from "@reduxjs/toolkit";
import darkmodeReducer from "./darkmode";
import temperatureReducer from "./temperature";
import languageReducer from "./language";
import apiWeatherReducer from "./apiWeather";
import apiLocationReducer from "./apiLocation";

export default configureStore({
  reducer: {
    darkmode: darkmodeReducer,
    temperature: temperatureReducer,
    language: languageReducer,
    weatherInfo: apiWeatherReducer,
    place: apiLocationReducer,
  },
});
