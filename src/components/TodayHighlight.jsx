import React, { useEffect, useState } from "react";
import { aqiText } from "../utils/utils";
import { getTime } from "../utils/utils";

function TodayHighlight({ location }) {
  const [air, setAir] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${process.env.REACT_APP_OWM_API_KEY}`
    );
    const data = await resp.json();
    setWeather(data);
  };

  const fetchAirPollution = async () => {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_OWM_API_KEY}`
    );
    const data = await resp.json();
    setAir(data.list[0]);
  };
  useEffect(() => {
    if (!location) return;

    fetchAirPollution();
    fetchWeather();

    //eslint-disable-next-line
  }, [location]);

  if (!air) return <div>Loading air quality...</div>;
  if (!weather) return <div>Loading weather...</div>;
  return (
    <>
      <section
        className="section highlights"
        aria-labelledby="highlights-lable"
      >
        <div className="card card-lg">
          <h2 className="title-2" id="highlights-lable">
            Today Highlights
          </h2>
          <div className="highlight-list">
            <div className="card card-sm highlight-card one">
              <h3 className="title-3">Air Quality Index</h3>
              <div className="wrapper">
                <span className="m-icon">air</span>
                <ul className="card-list">
                  <li className="card-item">
                    <p className="title-1">{air.components.pm2_5}</p>
                    <p className="label-1">
                      PM<sub>2.5</sub>
                    </p>
                  </li>
                  <li className="card-item">
                    <p className="title-1">{air.components.so2}</p>
                    <p className="label-1">
                      SO<sub>2</sub>
                    </p>
                  </li>
                  <li className="card-item">
                    <p className="title-1">{air.components.no2}</p>
                    <p className="label-1">
                      No<sub>2</sub>
                    </p>
                  </li>
                  <li className="card-item">
                    <p className="title-1">{air.components.o3}</p>
                    <p className="label-1">
                      O<sub>3</sub>
                    </p>
                  </li>
                </ul>
              </div>
              <span
                className={`badge aqi-${air.main.aqi} lable-${air.main.aqi}`}
                title={aqiText[air.main.aqi].message}
              >
                {aqiText[air.main.aqi].level}
              </span>
            </div>
            <div className="card card-sm highlight-card two">
              <h3 className="title-3">Sunrise &amp; Sunset</h3>
              <div className="wrapper">
                <div className="card-list">
                  <div className="card-item">
                    <span className="m-icon">clear_day</span>
                    <div className="lable-1">
                      <p className="lable-1">Sunrise</p>
                      <p className="title-1">
                        {getTime(
                          weather.sys && weather.sys?.sunrise,
                          weather.timezone
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="card-item">
                    <span className="m-icon">clear_night</span>
                    <div className="lable-1">
                      <p className="lable">Sunset</p>
                      <p className="title-1">
                        {getTime(
                          weather.sys && weather.sys.sunset,
                          weather.timezone
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-sm highlight-card">
              <h3 className="title-3">Humidity</h3>
              <div className="wrapper">
                <span className="m-icon">humidity_percentage</span>
                <p className="title-1">
                  {weather.main.humidity} {""}
                  <sub>%</sub>
                </p>
              </div>
            </div>
            <div className="card card-sm highlight-card">
              <h3 className="title-3">Pressure</h3>
              <div className="wrapper">
                <span className="m-icon">airwave</span>
                <p className="title-1">
                  {weather.main.pressure} <sub>hba</sub>
                </p>
              </div>
            </div>
            <div className="card card-sm highlight-card">
              <h3 className="title-3">Visibility</h3>
              <div className="wrapper">
                <span className="m-icon">visibility</span>
                <p className="title-1">
                  {weather.visibility / 1000} <sub>KM</sub>
                </p>
              </div>
            </div>
            <div className="card card-sm highlight-card">
              <h3 className="title-3">Feels Like</h3>
              <div className="wrapper">
                <span className="m-icon">thermostat</span>
                <p className="title-1">
                  {weather.main.feels_like}°<sup>c</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TodayHighlight;
