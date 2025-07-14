import React, { useEffect, useState } from "react";

function Forecast({ location }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (!location) return;
    const fetchForecast = async () => {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${process.env.REACT_APP_OWM_API_KEY}`
      );
      const data = await resp.json();
      setForecast(data);
    };
    fetchForecast();
  }, [location]);

  if (!forecast) return <div>Loading forecast...</div>;

  // Group by day
  const daily = [];
  const seen = new Set();
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!seen.has(date) && daily.length < 5) {
      daily.push(item);
      seen.add(date);
    }
  });
  return (
    <>
      <section className="section forecast" aria-labelledby="forecast-label">
        <h2 className="title-2" id="forecast-label">
          5 Days Forecast
        </h2>
        <div className="card card-lg forecast-card">
          <ul data-forecast-list>
            {daily.map((item, idx) => (
              <li className="card-item" key={idx}>
                <div className="icon-wrapper">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    width={36}
                    height={36}
                    alt={item.weather[0].description}
                    className="weather-icon"
                  />
                  <span className="span">
                    <p className="title-2">{Math.round(item.main.temp)}°</p>
                  </span>
                </div>
                <p className="label-1">
                  {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
                <p className="label-1">
                  {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                    weekday: "long",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Forecast;
