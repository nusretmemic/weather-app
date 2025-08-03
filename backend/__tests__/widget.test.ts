import request from "supertest";
import express from "express";
import widgetRoutes from "../routes/widgetRoutes";
import { commonMiddleware } from "../middleware";

// build a minimal app just for tests
const app = express();
app.use(commonMiddleware);
app.use("/widgets", widgetRoutes);

describe("Widget API", () => {
  it("GET /widgets → empty array", async () => {
    const res = await request(app).get("/widgets");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /widgets → create then GET", async () => {
    const widget = { id: 1, location: "Test City", lat: 10, lng: 20 };
    const post = await request(app)
      .post("/widgets")
      .send(widget)
      .set("Content-Type", "application/json");
    expect(post.status).toBe(201);
    expect(post.body).toMatchObject({
      _id: 1,
      location: "Test City",
      lat: 10,
      lng: 20,
    });

    const get = await request(app).get("/widgets");
    expect(get.status).toBe(200);
    // should include the created widget with a weather object
    expect(get.body.length).toBe(1);
    expect(get.body[0]).toHaveProperty("weather");
  });

  it("POST duplicate → 409 Conflict", async () => {
    const widget = { id: 2, location: "Dup City", lat: 0, lng: 0 };
    await request(app).post("/widgets").send(widget);
    const dup = await request(app).post("/widgets").send(widget);
    expect(dup.status).toBe(409);
    expect(dup.body).toHaveProperty("error", "Duplicate widget");
  });

  it("DELETE /widgets/:id → 204 then 404", async () => {
    const widget = { id: 3, location: "Del City", lat: 1, lng: 1 };
    await request(app).post("/widgets").send(widget);
    const del = await request(app).delete("/widgets/3");
    expect(del.status).toBe(204);

    const delAgain = await request(app).delete("/widgets/3");
    expect(delAgain.status).toBe(404);
  });
});
