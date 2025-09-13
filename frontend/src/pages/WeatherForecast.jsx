import React, { useState, useEffect } from "react";
import Chart from "../components/ui/Chart";
import { useWeatherData } from "../hooks/useWeatherData";
import toast from "react-hot-toast";

export default function WeatherForecast() {
  const [city, setCity] = useState("");
  const { data, loading, error } = useWeatherData(city);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <h1 className="text-center text-4xl font-bold mb-8">Weather Forecast</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!city.trim()) {
            toast.error("Please enter a city");
            return;
          }
        }}
        className="mb-6 text-center"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded text-black w-64"
        />
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && data.length > 0 && <Chart data={data} />}

      {!loading && !data.length && !error && <p className="text-center">No data available</p>}
    </div>
  );
}
