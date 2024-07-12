import { DateTime } from "luxon";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}${infoType}`);

  const params = new URLSearchParams({
    ...searchParams,
    appid: import.meta.env.VITE_API_KEY,
  }).toString();

  url.search = params;
  const response = await fetch(url);
  return await response.json();
};

const formatLocalTime = (
  secs,
  offset,
  format = "cccc , dd LLL yyyy ' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs, { zone: "utc" })
    .plus({ seconds: offset })
    .toFormat(format);
};

const iconFromCode = (code) => {
  return `https://openweathermap.org/img/wn/${code}.png`;
};

const formatForecastData = (secs, offset, list) => {
  const hourly = list
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);
  const daily = list
    .filter((f) => f.dt_txt && f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatLocalTime(f.dt, offset, "cccc"),
      icon: iconFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const formatData = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    weather: [{ main, icon }],
    wind: { speed },
    dt,
    sys: { country, sunrise, sunset },
    timezone,
    name,
  } = data;

  const localTime = formatLocalTime(dt, timezone);
  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    main,
    icon: iconFromCode(icon),
    speed,
    localTime,
    country,
    sunrise: formatLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatLocalTime(sunset, timezone, "hh:mm a"),
    name,
    timezone,
    dt,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const weatherData = await getWeatherData("weather", searchParams).then(
    formatData
  );
  const { dt, lat, lon, timezone } = weatherData;

  const forecastData = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastData(dt, timezone, d.list));
  return { ...weatherData, ...forecastData };
};

export default getFormattedWeatherData;
