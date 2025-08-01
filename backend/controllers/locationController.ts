import { Request, Response, NextFunction } from "express";
import { searchLocations } from "../services/locationService";

/**
 * Search for location suggestions based on query parameter `q`.
 */
export async function locationSearchHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { q } = req.query;
  if (typeof q !== "string" || !q.trim()) {
    return res.status(400).json({ error: "q query parameter is required" });
  }

  try {
    const suggestions = await searchLocations(q);
    res.json(suggestions);
  } catch (err) {
    console.error("Location search failed:", err);
    next(err);
  }
}
