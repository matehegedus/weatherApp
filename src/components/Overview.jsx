import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function Overview({ weather, current }) {
  const { temperature } = useSelector((state) => state.temperature);

  if (!weather) return <Loader />;

  const date = new Date(weather.dt_txt);
  let options = {};
  if (current) {
    options.year = "numeric";
    options.month = "short";
    options.weekday = "long";
  } else {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  const formattedDate = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(date);

  return (
    weather && (
      <div className="overview">
        <p className={`degree`}>
          {Math.round(weather.main.temp)} {temperature.display}
        </p>
        <div className="weather-title">
          <span>{`${weather.weather[0].main}`} </span>
          <img
            id="wicon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="weather icon"
          ></img>
        </div>
        <p className={`weather-description`}>
          {weather.weather[0].description}
        </p>
        <p>{formattedDate}</p>
      </div>
    )
  );
}
