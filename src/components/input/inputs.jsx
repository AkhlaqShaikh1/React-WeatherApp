import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
const InputField = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    if (city !== "") setQuery({ q: city });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const changeUnits = () => {
    setUnits((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setQuery({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="search city..."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          className="text-gray-500 text-xl font-light p-2 ml-16 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />

        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearch}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationSearch}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className="text-2xl font-medium transition ease-out hover:scale-150"
          onClick={() => setUnits("metric")}
        >
          &deg;C
        </button>
        <p className="text-2xl font-medium mx-1"> |</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-150"
          onClick={() => setUnits("imperial")}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
};

export default InputField;
