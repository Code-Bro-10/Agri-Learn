import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../frontend")));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ WORKING MODEL
      messages: [
        {
          role: "system",
          content:
            "You are a helpful farming assistant. Give simple and clear advice.",
        },
        {
          role: "user",
          content: userMsg,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("ERROR:", err.message);
    res.json({
      reply: "⚠️ Error from AI. Check model or API key.",
    });
  }
});

app.get("/api/weather", async (req, res) => {
  try {
    const r = await fetch("https://wttr.in/?format=j1&lang=en");
    const d = await r.json();
    res.json(d);
  } catch (e) {
    res.status(500).json({ error: "Weather unavailable" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
