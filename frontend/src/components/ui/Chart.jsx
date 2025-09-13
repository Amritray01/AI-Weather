import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }) {
  return (
    <div className="glass-card p-6 rounded-xl shadow-lg max-w-4xl mx-auto bg-white/20 backdrop-blur-md text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">7-Day Weather Forecast</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255 255 255 / 0.3)" />
          <XAxis dataKey="date" stroke="rgba(255 255 255 / 0.7)" tick={{ fontSize: 14, fontWeight: "500" }} />
          <YAxis
            yAxisId="left"
            label={{ value: "Temp (°C)", angle: -90, position: "insideLeft", fill: "#fff" }}
            stroke="#22c55e"
            tick={{ fontSize: 14, fontWeight: "500" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Precipitation (mm)", angle: 90, position: "insideRight", fill: "#fff" }}
            stroke="#3b82f6"
            tick={{ fontSize: 14, fontWeight: "500" }}
          />
          <Tooltip contentStyle={{ backgroundColor: "rgba(255 255 255 / 0.15)", color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#fff", fontWeight: "600", fontSize: 16, paddingBottom: 10 }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#22c55e"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 4, strokeWidth: 2, stroke: "#22c55e", fill: "#10b981" }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="precipitation"
            stroke="#3b82f6"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 4, strokeWidth: 2, stroke: "#3b82f6", fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
