import { useState } from "react";
import Overview from "./Overview";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function CurrentWeather() {
  const { temperature } = useSelector((state) => state.temperature);
  const { weatherInfo } = useSelector((state) => state.weatherInfo);

  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(false);

  if (weatherInfo.length === 0) return null;
  const todayWeather = weatherInfo[0];

  const details = [
    {
      name: t("Real Feel"),
      value: `${Math.round(todayWeather.main.feels_like)} ${
        temperature.display
      }`,
    },
    { name: t("Humidity"), value: `${todayWeather.main.humidity} %` },
    { name: t("Cloud Cover"), value: `TODO` },
    {
      name: t("Min. Temp"),
      value: `${Math.round(todayWeather.main.temp_min)} ${temperature.display}`,
    },
    {
      name: t("Max. Temp"),
      value: `${Math.round(todayWeather.main.temp_max)} ${temperature.display}`,
    },
  ];

  return (
    todayWeather && (
      <div
        className={`card currentWeather ${active ? "active" : ""}`}
        onMouseEnter={() => {
          setActive(true);
        }}
        onMouseLeave={() => {
          setActive(false);
        }}
      >
        <Overview weather={todayWeather} current={true} />
        <div className="details">
          {details.map((detail, idx) => (
            <div key={`forecast_${idx + 1}`} className="detail">
              <p className={`detail-name`}>{detail.name}:</p>
              <p className="detail-value">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
