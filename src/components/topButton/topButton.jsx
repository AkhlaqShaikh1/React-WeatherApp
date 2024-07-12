import React from "react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      name: "Karachi",
      id: 1,
    },
    {
      name: "Lahore",
      id: 2,
    },
    {
      name: "Islamabad",
      id: 3,
    },
    {
      name: "Quetta",
      id: 4,
    },
    {
      name: "Peshawar",
      id: 5,
    },
    {
      name: "Multan",
      id: 6,
    },
  ];

  return (
    <div className="flex item-center justify-around my-4">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium hover:bg-gray-600/20 px-4 rounded-md transition ease-in"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
