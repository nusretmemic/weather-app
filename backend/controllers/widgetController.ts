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
    // Validation error
    if (!location || typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({
        error: "Validation failed",
        details: ["location, lat, and lng are required and must be valid"],
      });
    }
    const widget = await Widget.create({ _id: id, location, lat, lng });
    res.status(201).json(widget);
  } catch (err: any) {
    // Duplicate key / conflict
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Duplicate widget",
        details: [`Widget with id ${req.body.id} already exists.`],
      });
    }
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
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["Parameter 'id' must be a number."],
      });
    }
    const deleted = await Widget.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        error: "Widget not found",
      });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
