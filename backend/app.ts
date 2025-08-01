import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  listWidgets,
  createWidget,
  deleteWidget,
} from "./controllers/widgetController";
import { locationSearchHandler } from "./controllers/locationController";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/locations", locationSearchHandler);

app.get("/widgets", listWidgets);
app.post("/widgets", createWidget);
app.delete("/widgets/:id", deleteWidget);

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
