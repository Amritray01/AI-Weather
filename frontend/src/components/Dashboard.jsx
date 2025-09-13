import React, { useEffect, useState } from "react";

export default function Dashboard({ history }) {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    if (!history.length) return;

    // Collect temperatures, weather types, humidity, etc.
    const temps = history.map((h) => h.main.temp);
    const descriptions = history.map((h) => h.weather[0].main.toLowerCase());
    const humidities = history.map((h) => h.main.humidity);

    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
    const avgHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length);

    // Analyze weather types for suggestions
    const suggestions = [];
    if (descriptions.includes("rain")) suggestions.push("🌧️ It might rain, carry an umbrella!");
    if (descriptions.includes("snow")) suggestions.push("❄️ Snow expected, wear warm clothes!");
    if (descriptions.includes("clear")) suggestions.push("☀️ Clear skies ahead, enjoy your day!");
    if (descriptions.includes("clouds")) suggestions.push("☁️ Cloudy weather, a light jacket might be useful.");
    if (avgTemp > 30) suggestions.push("🔥 It's hot! Stay hydrated and avoid direct sunlight.");
    if (avgTemp < 10) suggestions.push("🥶 It's cold! Wear warm clothes and stay cozy.");
    if (avgHumidity > 80) suggestions.push("💧 High humidity, expect it to feel warmer than actual temperature.");

    // Combine all AI suggestions
    const summary = `🤖 Over ${history.length} recent searches, the average temperature is ${avgTemp}°C and average humidity is ${avgHumidity}%.`;
    const fullAdvice = [summary, ...suggestions].join(" ");

    setAdvice(fullAdvice);
  }, [history]);

  if (!history.length) return null;

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6 mt-4">
      {/* Recent Searches */}
      <div className="bg-white/10 glass-card p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white text-center">🌤️ Recent Searches</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white/10 rounded-xl shadow hover:scale-105 transition transform cursor-pointer border border-white/25"
            >
              <p className="font-semibold text-white text-lg">{item.name}</p>
              <p className="text-white/70 capitalize">{item.weather[0].description}</p>
              <p className="text-white font-medium">{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      {advice && (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 glass-card p-6 rounded-2xl shadow-lg text-white text-center">
          <h3 className="text-lg font-semibold mb-2">🤖 AI Suggestions</h3>
          <p className="text-sm">{advice}</p>
        </div>
      )}
    </div>
  );
}
