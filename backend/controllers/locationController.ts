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
    return res.status(400).json({
      error: "Validation failed",
      details: [
        "Query parameter 'q' is required and must be a non-empty string",
      ],
    });
  }

  try {
    const suggestions = await searchLocations(q);
    res.json(suggestions);
  } catch (err) {
    next(err);
  }
}
