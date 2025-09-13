import { useState, useEffect } from "react";

const API_KEY = VITE_OPENWEATHER_API_KEY
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

export function useWeather(city) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    setError(null);

    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return response.json();
      })
      .then((json) => {
        // Process API data into chart-friendly format (daily temperature averages)
        const dailyData = {};

        json.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyData[date]) {
            dailyData[date] = { tempSum: 0, count: 0, precipitationSum: 0 };
          }
          dailyData[date].tempSum += item.main.temp;
          dailyData[date].precipitationSum += item.rain?.["3h"] || 0;
          dailyData[date].count++;
        });

        const chartData = Object.entries(dailyData).map(([date, val]) => ({
          date,
          temperature: parseFloat((val.tempSum / val.count).toFixed(1)),
          precipitation: parseFloat(val.precipitationSum.toFixed(1)),
        }));

        setData(chartData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city]);

  return { data, loading, error };
}
