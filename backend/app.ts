import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { commonMiddleware } from "./middleware";
import locationRoutes from "./routes/locationRoutes";
import widgetRoutes from "./routes/widgetRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config(); // Load environment variables

// Initialize Express app
const app = express();

// Common middleware (CORS, JSON parser)
app.use(commonMiddleware);
// Error handling middleware
app.use(errorHandler);

// API routes
app.use("/locations", locationRoutes);
app.use("/widgets", widgetRoutes);

// Root health-check
app.get("/", (_req, res) => res.send("✅ Weather App API is running"));

// Connect DB & start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Listening on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
