import React from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets, Thermometer } from "lucide-react";

const getWeatherIcon = (main) => {
  switch (main.toLowerCase()) {
    case "clear":
      return <Sun className="w-16 h-16 text-yellow-400" />;
    case "clouds":
      return <Cloud className="w-16 h-16 text-gray-300" />;
    case "rain":
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    case "snow":
      return <CloudSnow className="w-16 h-16 text-blue-200" />;
    default:
      return <Cloud className="w-16 h-16 text-gray-300" />;
  }
};

const WeatherCard = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="weather-card animate-fade-in w-full max-w-md glass-card p-6 rounded-xl">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">{getWeatherIcon(weather.weather[0].main)}</div>
        <h2 className="text-2xl font-bold text-white mb-1">{weather.name}, {weather.sys.country}</h2>
        <p className="text-white/80 capitalize text-lg">{weather.weather[0].description}</p>
        <div className="text-6xl font-light text-white mt-4 mb-2">{Math.round(weather.main.temp)}°</div>
        <p className="text-white/70">Feels like {Math.round(weather.main.feels_like)}°</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl text-center">
          <Droplets className="w-6 h-6 text-blue-300 mx-auto mb-2" />
          <p className="text-white/70 text-sm">Humidity</p>
          <p className="text-white font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <Wind className="w-6 h-6 text-green-300 mx-auto mb-2" />
          <p className="text-white/70 text-sm">Wind Speed</p>
          <p className="text-white font-semibold">{weather.wind.speed} m/s</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <Thermometer className="w-6 h-6 text-red-300 mx-auto mb-2" />
          <p className="text-white/70 text-sm">Pressure</p>
          <p className="text-white font-semibold">{weather.main.pressure} hPa</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <Eye className="w-6 h-6 text-purple-300 mx-auto mb-2" />
          <p className="text-white/70 text-sm">Visibility</p>
          <p className="text-white font-semibold">{weather.visibility ? (weather.visibility / 1000).toFixed(1) + " km" : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
