import React from "react";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
const TempAndDetails = ({
  weather: {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    main,
    icon,
    speed,
    localTime,
    country,
    sunrise,
    sunset,
    name,
    timezone,
    dt,
  },
  units,
}) => {
  const weatherDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°C`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity}%`,
    },
    {
      id: 3,
      Icon: FaWind,
      title: "Wind",
      value: `${speed} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];
  const horizontalweatherDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: `${sunrise}`,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: `${sunset}`,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Down",
      value: `${temp_min.toFixed()}°`,
    },
  ];
  return (
    <div>
      <div className="flex item-center justify-center my-6">
        <p className="text-xl font-normal text-blue-200 py-6">{main}</p>
      </div>
      <div className="flex flex-row item-center justify-between ">
        <img src={icon} className="w-20" />
        <p className="text-5xl ml-10 py-1">{temp.toFixed()}</p>
        <div className="flex flex-col space-y-3 items-start">
          {weatherDetails.map(({ id, title, Icon, value }) => (
            <div
              key={id}
              className="flex text-sm font-light items-center justify-center"
            >
              <Icon size={10} className="mr-1" />
              {`${title}:`}:<span className="ml-1 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center py-6 px-12">
        {horizontalweatherDetails.map(({ id, title, Icon, value }) => (
          <div className="flex text-sm items-center justify-center">
            <div
              key={id}
              className="flex text-sm font-light items-center justify-center mx-10 "
            >
              <Icon size={30} className="mr-1" />
              {`${title}:`}
              <span className="ml-1 font-medium">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
