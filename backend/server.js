import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_agrilearn_secret_key";

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB established."))
    .catch((err) => console.error("MongoDB connection error:", err));
} else {
  console.log("No MONGO_URI provided in .env");
}

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

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAvatar = avatar || '👨‍🌾';

    // Insert user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: userAvatar,
    });
    
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, name, email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name, email, avatar: userAvatar } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Me
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
