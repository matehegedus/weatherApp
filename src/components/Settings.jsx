import darkSVG from "../assets/dark.svg";
import lightSVG from "../assets/light.svg";

import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "./../redux/darkmode";
import { toggleTemperature } from "../redux/temperature";
import { toggleLanguage } from "../redux/language";

export default function Settings() {
  const { darkmode } = useSelector((state) => state.darkmode);
  const { temperature } = useSelector((state) => state.temperature);
  const { language } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  return (
    <div className="settings">
      <select
        className="btn btn-secondary dropdown-toggle"
        value={language}
        name="language"
        id="language"
        onChange={() => {
          dispatch(toggleLanguage());
        }}
      >
        <option value="en">English</option>
        <option value="de">German</option>
      </select>

      <div className="settings-darkmode">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkmode}
            onChange={() => {
              dispatch(toggleDarkMode());
            }}
          />
          <span
            className="slider round"
            style={{
              backgroundImage: `url(${darkmode ? darkSVG : lightSVG})`,
            }}
          ></span>
        </label>
      </div>

      <select
        className="btn btn-secondary dropdown-toggle"
        name="temperature"
        id="temperature"
        value={temperature.format}
        onChange={() => {
          dispatch(toggleTemperature());
        }}
      >
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
      </select>
    </div>
  );
}
