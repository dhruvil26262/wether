import React, { useEffect, useState, useCallback } from "react";
import Header from "../common/Header";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import TodayHighlight from "../components/TodayHighlight";
import FutureForcast from "../components/FutureForcast";

function Home() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const fetchApproximateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          // Fallback to default location if geolocation fails
          setLocation({
            latitude: 23.0258,
            longitude: 72.5873,
          });
          console.error("Error getting geolocation:", error);
          setLocationError(
            "Could not get your location. Using default location."
          );
        }
      );
    } else {
      // Browser doesn't support Geolocation
      setLocation({
        latitude: 23.0258,
        longitude: 72.5873,
      });
      setLocationError(
        "Geolocation is not supported by your browser. Using default location."
      );
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchApproximateLocation();
  }, []);

  const handleLocationSelect = useCallback((lat, lon) => {
    setLocation({ latitude: lat, longitude: lon });
    setLocationError(null);
  }, []);

  return (
    <>
      <Header onLocationSelect={handleLocationSelect} />
      <main>
        <article className="container">
          <div className="content-left">
            <CurrentWeather location={location} />
            <Forecast location={location} />
          </div>
          <div className="content-right">
            <TodayHighlight location={location} />
            <FutureForcast location={location} />
          </div>
          <div
            className="loading"
            style={{ display: location ? "none" : "grid" }}
          >
            {locationError ? `Error: ${locationError}` : "Loading location..."}
          </div>
        </article>
      </main>
    </>
  );
}

export default Home;
