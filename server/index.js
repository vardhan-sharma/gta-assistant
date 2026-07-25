import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import chatHistoryRoutes from "./routes/chatHistoryRoutes.js";
import { connectDB } from "./config/db.js";
import weatherRoutes from "./routes/weatherRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin === "https://gta-assistant.vercel.app" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Required to populate req.body on POST/PATCH requests.
// Without this every controller reading req.body was receiving `undefined`.
app.use(express.json());

app.use("/api/chat", rateLimiter);

app.use("/api", chatRoutes);
app.use("/api/chats", chatHistoryRoutes);
app.use("/api/weather", weatherRoutes);
const PORT = process.env.PORT || 5000;

await connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});