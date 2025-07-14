import React, { useEffect, useState } from "react";

function CurrentWeather({ location }) {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${process.env.REACT_APP_OWM_API_KEY}`
    );
    const data = await resp.json();
    setWeather(data);
  };

  const fetchCityName = async () => {
    const resp = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&limit=5&appid=${process.env.REACT_APP_OWM_API_KEY}`
    );
    const data = await resp.json();

    setCity(data);
  };

  useEffect(() => {
    if (!location) return;

    fetchWeather();
    fetchCityName();
    //eslint-disable-next-line
  }, [location]);

  if (!weather) return <div>Loading current weather...</div>;
  return (
    <>
      <section className="section current-weather" aria-label="current weather">
        <div className="card card-lg current-weather-card">
          <h2 className="title-2 card-title">Now</h2>
          <div className="weapper">
            <p className="heading">
              {Math.round(weather.main.temp)}°<sup>c</sup>
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              width={64}
              height={64}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
          </div>
          <p className="body-3">{weather.weather[0].description}</p>
          <ul className="meta-list">
            <li className="meta-item">
              <span className="m-icon">calendar_today</span>
              <p className="title-3 meta-text">
                {new Date(weather.dt * 1000).toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </li>
            <li className="meta-item">
              <span className="m-icon">location_on</span>
              <p className="title-3 meta-text">
                {city[0]?.name}, {city[0]?.country}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default CurrentWeather;
