import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://gta-assistant.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.use(rateLimiter);

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 GTA Assistant Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});