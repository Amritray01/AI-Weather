import express from "express";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/advice", async (req, res) => {
  try {
    const { history } = req.body;

    if (!history || history.length === 0) {
      return res.json({ summary: "No data available yet." });
    }

    const temps = history.map((h) => h.main.temp);
    const avg = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);

    // Example Groq AI call
    const completion = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful weather advisor." },
        {
          role: "user",
          content: `Summarize weather trends from history: ${history
            .map((h) => `${h.name} ${h.main.temp}°C`)
            .join(", ")}. The avg temperature is ${avg}°C.`,
        },
      ],
    });

    res.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq AI Error:", error);
    res.status(500).json({ error: "❌ AI processing failed" });
  }
});

export default router;
