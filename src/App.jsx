import TopButtons from "./components/topButton/topButton";
import InputField from "./components/input/inputs";
import TimeAndLocation from "./components/Time&Loc/time_and_loc";
import TempAndDetails from "./components/Temp&Details/temp_and_dets";
import Forecast from "./components/forecast/forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";

import Loader from "./components/loader";

const App = () => {
  const [query, setQuery] = useState({ q: "Karachi" });
  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeather = async () => {
    setLoading(true);
    const message = query.q
      ? `Fetching weather for ${capitalizeFirstLetter(query.q)}`
      : "Fetching weather for your location";
    toast.info(message);
    await getFormattedWeatherData({
      ...query,
      units,
    }).then((data) => {
      toast.success(
        `Weather Fetched Successfully for ${capitalizeFirstLetter(data.name)} ${
          data.country
        } 🎉`
      );
      setWeather(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const debouncedGetWeather = debounce(() => {
      getWeather();
    }, 500);

    debouncedGetWeather();

    return () => {
      debouncedGetWeather.cancel();
    };
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return " from-cyan-500 to-blue-700";
    const threshold = units === "metric" ? 20 : 68;
    return weather.temp <= threshold
      ? "from-cyan-500 to-blue-700"
      : "from-yellow-500 to-orange-700";
  };

  return loading == true ? (
    <Loader />
  ) : (
    <>
      <div
        className={`inset-0 px-4 sm:px-8 md:px-16 lg:px-32 py-5 bg-gradient-to-br shadow-xl shadow-gray-400  ${formatBackground()}`}
      >
        <TopButtons setQuery={setQuery} />
        <InputField setQuery={setQuery} setUnits={setUnits} />
        {weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
            <Forecast title="3-hour step Forecast" data={weather.hourly} />
            <Forecast title="5-day step Forecast" data={weather.daily} />
          </>
        )}

        <ToastContainer autoClose={1500} theme="colored" />
      </div>
    </>
  );
};

export default App;
