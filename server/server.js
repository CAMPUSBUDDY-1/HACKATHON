const express = require("express");
const cors = require("cors");
const { Bot } = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Create Telegram bot
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusBuddy backend is running",
  });
});

// Send seat alert
app.post("/api/seat-alert", async (req, res) => {
  try {
    const { spaceName } = req.body;

    if (!spaceName) {
      return res.status(400).json({
        success: false,
        message: "spaceName is required",
      });
    }

    const message = `🔔 CampusBuddy Seat Alert

📍 ${spaceName}

You asked to be notified when seats become available.

CampusBuddy will notify you when seats open.`;

    await bot.api.sendMessage({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    });

    res.json({
      success: true,
      message: "Telegram alert sent successfully",
    });
  } catch (error) {
    console.error("Telegram error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Simulate seats opening
app.post("/api/simulate-seat-open", async (req, res) => {
  try {
    const { spaceName, seats } = req.body;

    const message = `🚨 CAMPUSBUDDY — SEATS OPEN!

📍 ${spaceName || "Study Space"}

🪑 ${seats || 3} seats are now available.

Open CampusBuddy to check the space.`;

    await bot.api.sendMessage({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    });

    res.json({
      success: true,
      message: "Seat-open Telegram notification sent",
    });
  } catch (error) {
    console.error("Telegram error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Start backend
app.listen(PORT, () => {
  console.log(`CampusBuddy backend running on http://localhost:${PORT}`);
});