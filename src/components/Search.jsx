import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../redux/apiLocation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { place } = useSelector((state) => state.place);
  const { cities } = useSelector((state) => state.cities);
  const { weatherInfo } = useSelector((state) => state.weatherInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [searchTxt, setSearchTxt] = useState(place);
  useEffect(() => {
    setSearchTxt(place);
  }, [place]);

  let weatherType = "Undefined";

  if (!weatherInfo) weatherType = "Error";
  else if (weatherInfo.length > 0) weatherType = weatherInfo[0].weather[0].main;

  const bg = {
    Undefined: "https://media.tenor.com/BLvS0Wn8BvAAAAAC/loading-waiting.gif",
    Error: "https://media.tenor.com/sQ2eMwPh9v4AAAAC/error-code.gif",
    Clear: "https://media.tenor.com/PeDk7wvETuMAAAAC/sky-heaven.gif",
    Clouds: "https://media.tenor.com/dCel8JW2vpQAAAAC/cloud.gif",
    Rain: "https://media.tenor.com/vOETLJqqGnoAAAAC/rain-window.gif",
    Drizzle: "https://media.tenor.com/vOETLJqqGnoAAAAC/rain-window.gif",
    Thunderstorm:
      "https://media.tenor.com/QMYftks7xLEAAAAC/lightning-weather.gif",
    Snow: "https://media.tenor.com/fwEQI4qR7aEAAAAC/snowfall-primal-survivor.gif",
  };

  const getSearch = () => {
    return (
      <form>
        <label>
          {t("Current city") + ":"}
          <input
            className="form-control"
            type="text"
            value={searchTxt}
            onChange={(e) => {
              setSearchTxt(e.target.value);
            }}
          />
        </label>
        <button
          className="btn btn-primary"
          value="Search"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setLocation(searchTxt));
          }}
        >
          {t("Search")}
        </button>
      </form>
    );
  };

  const getList = () => {
    return (
      <div>
        <select
          value={cities.includes(place) ? place : "default"}
          className="btn btn-info"
          onChange={(e) => {
            dispatch(setLocation(e.target.value));
            navigate(`/${e.target.value}`);
          }}
        >
          <option value="default" disabled hidden>
            Select a city...
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg[weatherType]})`,
        backgroundSize: "cover",
      }}
      className="search"
    >
      {getList()}
    </div>
  );
}
