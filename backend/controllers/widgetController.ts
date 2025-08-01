import { Request, Response, NextFunction } from "express";
import Widget from "../models/Widget";
import { getWeather } from "../services/weatherService";

/**
 * List all widgets with live weather data.
 */
export async function listWidgets(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const widgets = await Widget.find().sort({ createdAt: -1 });
    const withWeather = await Promise.all(
      widgets.map(async (w) => ({
        id: w._id,
        location: w.location,
        weather: await getWeather(w),
      }))
    );
    res.json(withWeather);
  } catch (err) {
    next(err);
  }
}

/**
 * Create a new widget with location and coordinates.
 */
export async function createWidget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, location, lat, lng } = req.body;
    if (!location || typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({ error: "location, lat, and lng required" });
    }
    const widget = await Widget.create({ _id: id, location, lat, lng });
    res.status(201).json(widget);
  } catch (err) {
    next(err);
  }
}

/**
 * Delete a widget by its ID.
 */
export async function deleteWidget(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await Widget.deleteOne({ _id: id });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
