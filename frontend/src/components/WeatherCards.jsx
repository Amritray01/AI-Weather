import React from "react";
import WeatherCard from "./WeatherCard";

export default function WeatherCards({ weather }) {
  // You can extend this to include hourly/forecast widgets later
  return (
    <div className="w-full flex flex-col items-center">
      <WeatherCard weather={weather} />
    </div>
  );
}
