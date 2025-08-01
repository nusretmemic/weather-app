import { Request, Response } from "express";
import { searchLocations } from "../services/locationService";

export async function locationSearchHandler(req: Request, res: Response) {
  const { q } = req.query;
  if (typeof q !== "string" || !q.trim()) {
    return res.status(400).json({ error: "q query parameter is required" });
  }
  try {
    const suggestions = await searchLocations(q);
    res.json(suggestions);
  } catch (err) {
    console.error("Location search failed:", err);
    res.status(500).json({ error: "Failed to search locations" });
  }
}
