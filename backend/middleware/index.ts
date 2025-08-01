import cors from "cors";
import express from "express";

export const commonMiddleware = [
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  }),
  express.json(),
];
