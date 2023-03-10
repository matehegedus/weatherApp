import { useState } from "react";
import { useSelector } from "react-redux";
import Overview from "./Overview";

export default function Forecast() {
  const { weatherInfo } = useSelector((state) => state.weatherInfo);

  const [active, setActive] = useState(false);

  const nextDays = new Array(weatherInfo.length).fill(0).map((_, idx) => {
    return (
      <div className="forecast-container" key={`container_${idx}`}>
        <Overview key={`widget_${idx}`} weather={weatherInfo[idx]} />
        {idx < weatherInfo.length - 1 && (
          <div key={`separator_${idx}`} className="separator" />
        )}
      </div>
    );
  });

  return (
    <div
      className={`card forecast ${active ? "active" : ""}`}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      {nextDays}
    </div>
  );
}
