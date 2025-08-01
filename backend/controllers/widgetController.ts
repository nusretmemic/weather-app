import { Request, Response } from "express";
import Widget from "../models/Widget";
import { getWeather } from "../services/weatherService";

export async function listWidgets(req: Request, res: Response) {
  const widgets = await Widget.find().sort({ createdAt: -1 });
  // add live weather data to each widget
  const withWeather = await Promise.all(
    widgets.map(async (w) => ({
      id: w._id,
      location: w.location,
      weather: await getWeather(w),
    }))
  );
  res.json(withWeather);
}

export async function createWidget(req: Request, res: Response) {
  const { id, location, lat, lng } = req.body;
  if (!location || typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "location, lat, and lng required" });
  }

  const widget = await Widget.create({ _id: id, location, lat, lng });
  res.status(201).json(widget);
}

export async function deleteWidget(req: Request, res: Response) {
  const { id } = req.params;
  await Widget.deleteOne({
    _id: id,
  });
  res.status(204).send();
}
