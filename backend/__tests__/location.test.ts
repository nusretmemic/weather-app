import request from "supertest";
import express from "express";
import locationRoutes from "../routes/locationRoutes";
import { commonMiddleware } from "../middleware";

const app = express();
app.use(commonMiddleware);
app.use("/locations", locationRoutes);

describe("Location Search API", () => {
  it("GET /locations/search without q → 400", async () => {
    const res = await request(app).get("/locations/search");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Validation failed");
  });

  it("GET /locations/search?q=Berlin → 200 + array", async () => {
    const res = await request(app).get("/locations/search?q=Berlin");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // if no results, it's still an empty array, but no error
    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});
