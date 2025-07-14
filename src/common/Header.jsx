import React, { useState, useRef } from "react";

function Header({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isResultActive, setIsResultActive] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchTimeOutDuration = 500;

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!value) {
      setIsResultActive(false);
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      if (value.length < 3) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      try {
        const resp = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            value
          )}&limit=5&appid=${process.env.REACT_APP_OWM_API_KEY}`
        );
        const data = await resp.json();
        setResults(data);
        setIsResultActive(true);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, searchTimeOutDuration);
  };

  const handleLocationSelect = (lat, lon, name) => {
    onLocationSelect(lat, lon);
    setQuery("");
    setResults([]);
    setIsResultActive(false);
  };

  return (
    <header className="header">
      <div className="container">
        <a href="#/" className="logo">
          <img src="assest/images/logo.png" alt="logo" />
        </a>
        <div className="search-view" data-search-view>
          <div className="search-wrapper">
            <input
              type="search"
              name="search"
              className={`search-field ${isSearching ? "searching" : ""}`}
              placeholder="search city ..."
              autoComplete="off"
              value={query}
              onChange={handleSearch}
              data-search-field
            />
            <span className="m-icon leading-icon">search</span>
            <button
              className="icon-btn leading-icon has-state"
              aria-label="close search"
              data-search-toggler
            >
              <span className="m-icon">arrow_back</span>
            </button>
          </div>
          <div
            className={`search-result ${isResultActive ? "active" : ""}`}
            data-search-result
          >
            {results.length > 0 && (
              <ul className="view-list" data-search-list>
                {results.map((location) => (
                  <li
                    key={`${location.lat}-${location.lon}`}
                    className="view-item"
                  >
                    <span className="m-icon">location_on</span>
                    <div>
                      <p className="item-title">{location.name}</p>
                      <p className="label-2 item-subtitle">
                        {location.state || ""} {location.country}
                      </p>
                    </div>
                    <a
                      href={`#/weather?lat=${location.lat}&lon=${location.lon}`}
                      className="item-link has-state"
                      aria-label={`${location.name} weather`}
                      data-search-toggler
                      onClick={(e) => {
                        e.preventDefault();
                        handleLocationSelect(
                          location.lat,
                          location.lon,
                          location.name
                        );
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="header-actions">
          <button
            className="icon-btn has-state"
            aria-label="open search"
            data-search-toggler
          >
            <span className="m-icon">search</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
