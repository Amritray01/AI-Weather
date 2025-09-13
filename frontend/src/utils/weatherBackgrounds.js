export function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}

export function getWeatherBackground(main, timeOfDay = "day") {
  const m = (main || "").toLowerCase();
  if (m.includes("rain")) {
    return {
      gradient: "linear-gradient(135deg,#2b6cb0 0%,#1e3a8a 100%)",
      overlay: "rgba(10,25,47,0.45)",
      className: "bg-gradient-to-br from-blue-700 to-blue-900",
    };
  }
  if (m.includes("cloud")) {
    return {
      gradient: "linear-gradient(135deg,#6b7280 0%,#374151 100%)",
      overlay: "rgba(7,10,20,0.45)",
      className: "bg-gradient-to-br from-gray-600 to-gray-800",
    };
  }
  if (m.includes("snow")) {
    return {
      gradient: "linear-gradient(135deg,#93c5fd 0%,#e6f0ff 100%)",
      overlay: "rgba(255,255,255,0.05)",
      className: "bg-gradient-to-br from-sky-200 to-white",
    };
  }
  if (m.includes("clear")) {
    if (timeOfDay === "night") {
      return {
        gradient: "linear-gradient(135deg,#0f172a 0%,#0b1220 100%)",
        overlay: "rgba(0,0,0,0.45)",
        className: "bg-gradient-to-br from-sky-900 to-indigo-900",
      };
    }
    return {
      gradient: "linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)",
      overlay: "rgba(255,255,255,0.05)",
      className: "bg-gradient-to-br from-yellow-300 to-orange-400",
    };
  }
  // default
  return {
    gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    overlay: "rgba(0,0,0,0.25)",
    className: "bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-700",
  };
}
