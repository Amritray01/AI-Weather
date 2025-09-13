import React from "react";

export default function WeatherHistory({ history = [], onSelectCity }) {
  if (!history || history.length === 0) return null;
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-md">
      <h4 className="text-white font-semibold mb-3">Recent searches</h4>
      <div className="flex gap-3 overflow-x-auto py-1">
        {history.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelectCity(item)}
            className="min-w-[140px] p-3 rounded-lg bg-white/6 hover:bg-white/12 transition text-left"
          >
            <div className="text-white font-semibold">{item.name}</div>
            <div className="text-white/70 text-sm capitalize">{item.weather[0].description}</div>
            <div className="text-white/80 text-lg mt-1">{Math.round(item.main.temp)}°C</div>
          </button>
        ))}
      </div>
    </div>
  );
}
