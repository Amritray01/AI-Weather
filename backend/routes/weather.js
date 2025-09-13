import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch weather" });
  }
});

export default router;
