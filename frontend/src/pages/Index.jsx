// src/main.jsx or src/pages/Index.jsx
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCards from "@/components/WeatherCards";
import Dashboard from "@/components/Dashboard"; 
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/useToast";
import { getWeatherBackground, getTimeOfDay } from "@/utils/weatherBackgrounds";
import heroBackground from "@/assets/weather-hero-bg.jpg";

const API_BASE = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function Index() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const { toast } = useToast();

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE}?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (!response.ok) {
        if (data.cod === "401") {
          setError("Please add your OpenWeather API key.");
          toast({
            title: "API Key Required",
            description: "Add your OpenWeather API key to fetch weather data.",
            variant: "destructive",
          });
        } else if (data.cod === "404") {
          setError("City not found. Please check spelling and try again.");
        } else {
          setError(data.message || "An error occurred while fetching weather data.");
        }
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
        setSearchHistory((prev) => {
          const filtered = prev.filter((item) => item.name !== data.name);
          return [data, ...filtered].slice(0, 5);
        });
        toast({
          title: "Weather Updated",
          description: `Showing weather for ${data.name}, ${data.sys.country}`,
        });
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      setWeather(null);
      toast({
        title: "Connection Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromHistory = (city) => fetchWeather(city);

  const backgroundConfig = weather
    ? getWeatherBackground(weather.weather[0].main, getTimeOfDay())
    : {
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overlay: "rgba(102, 126, 234, 0.5)",
        className: "bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600",
      };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${backgroundConfig.className}`}
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: backgroundConfig.overlay,
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">🌤️ AI Weather</h1>
          <p className="text-xl text-white/80 font-medium">
            Discover weather conditions anywhere in the world
          </p>
        </header>

        {/* Search Bar */}
        <div className="w-full flex flex-col items-center gap-4">
          <SearchBar onSearch={fetchWeather} loading={loading} />
          <Dashboard history={searchHistory} onSelectCity={handleSelectFromHistory} />
        </div>

        {/* Main Section */}
        <main className="flex flex-col items-center mt-6">
          {loading && <LoadingSpinner />}
          {error && !loading && <ErrorMessage message={error} />}
          {weather && !loading && !error && <WeatherCards weather={weather} />}
        </main>

        {/* Default message */}
        {!weather && !loading && !error && (
          <div className="glass-card rounded-2xl p-6 max-w-md mt-8 text-center">
            <p className="text-white/80">
              Start by searching for any city to see current weather conditions
            </p>
            <p className="text-white/60 text-sm mt-2">Add your OpenWeather API key for live data</p>
          </div>
        )}
      </div>
    </div>
  );
}
