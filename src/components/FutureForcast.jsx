import React, { useEffect, useState } from "react";
import { getDateWithoutWeek, getTime } from "../utils/utils";

function FutureForcast({ location }) {
  const [hourly, setHourly] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchForecast = async () => {
    setLoading(true);
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${process.env.REACT_APP_OWM_API_KEY}`
    );
    const data = await resp.json();

    setHourly(data.list);
    setCity(data.city);

    setLoading(false);
  };

  useEffect(() => {
    if (!location) return;

    fetchForecast();
    //eslint-disable-next-line
  }, [location]);

  if (loading) return <div>Loading hourly forecast...</div>;
  if (!hourly.length) return <div>No hourly data available.</div>;

  return (
    <>
      <section className="section hourly-forecast" aria-label="hourly forecast">
        <h2 className="title-2">Future Forcast</h2>
        <div className="slider-container">
          <ul className="slider-list" data-temp>
            {hourly.map((item, idx) => (
              <li className="slider-item" key={idx}>
                <div className="card card-sm slider-card">
                  <p className="body-3">
                    {getDateWithoutWeek(item.dt, city.timezone)} <br />
                    {getTime(item.dt, city.timezone)}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    width={48}
                    height={48}
                    loading="lazy"
                    alt={item.weather[0].description}
                    className="weather-icon"
                    title={item.weather[0].description}
                  />
                  <p className="body-3">{Math.round(item.main.temp)}°</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="slider-list" data-wind>
            {hourly.map((item, idx) => (
              <li className="slider-item" key={idx}>
                <div className="card card-sm slider-card">
                  <p className="body-3">
                    {getDateWithoutWeek(item.dt, city.timezone)} <br />
                    {getTime(item.dt, city.timezone)}
                  </p>
                  <img
                    src="./assest/images/weather_icons/direction.png"
                    width={48}
                    height={48}
                    loading="lazy"
                    alt=""
                    className="weather-icon"
                    style={{ transform: `rotate(${item.wind.deg}deg)` }}
                  />
                  <p className="body-3">
                    {Math.round(item.wind.speed * 3.6)} Km/h
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default FutureForcast;
