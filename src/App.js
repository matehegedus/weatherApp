import "./App.css";
import "./switch.css";
import Forecast from "./components/Forecast";
import CurrentWeather from "./components/CurrentWeather";
import Settings from "./components/Settings";
import Search from "./components/Search";

import { fetchWeather } from "./redux/apiWeather";
import { fetchLocation, setLocation } from "./redux/apiLocation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";

//react router
import { Route, Routes, useLocation, useParams } from "react-router-dom";

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const dispatch = useDispatch();
  const { darkmode } = useSelector((state) => state.darkmode);
  const { temperature } = useSelector((state) => state.temperature);
  const { language } = useSelector((state) => state.language);
  const { weatherInfo } = useSelector((state) => state.weatherInfo);
  const { place } = useSelector((state) => state.place);
  const { cities } = useSelector((state) => state.cities);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add("dark");
    //get country (city is wrong sometimes)

    if (location.pathname.length > 1) {
      const city = location.pathname.slice(1);
      dispatch(setLocation(city));
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(fetchLocation(position));
      });
    }
  }, []);

  useEffect(() => {
    if (!loaded && weatherInfo && weatherInfo.length > 0) setLoaded(true);
  }, [weatherInfo]);

  useEffect(() => {
    if (darkmode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkmode]);

  useEffect(() => {
    dispatch(fetchWeather({ language, temperature, place }));
    i18n.changeLanguage(language);
  }, [language, place, temperature]);

  const GetInfo = () => {
    //const { cityName } = useParams();

    return (
      <div className="info">
        <Settings />
        <h2>{t("Today")}</h2>
        {loaded ? <CurrentWeather /> : <Loader />}
        <h2>
          {t("More on")} {place}
        </h2>
        {loaded ? <Forecast /> : <Loader />}
      </div>
    );
  };

  return (
    <div className={`card content ${darkmode ? "dark" : ""}`}>
      <Search />
      <Routes>
        <Route path="/" element={<GetInfo />} />
        {
          //cities.map((city) => (
          //<Route path={`/${city}`} element={getInfo()} />
          //))
          <Route path=":cityName" element={<GetInfo />} />
        }
      </Routes>
    </div>
  );
}

export default App;
