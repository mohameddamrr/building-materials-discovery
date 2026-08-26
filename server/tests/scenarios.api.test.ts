import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("guided scenario API", () => {
  it("lists supported scenario summaries without result details", async () => {
    const response = await request(app).get("/api/scenarios").expect(200);
    expect(response.body.total).toBe(3);
    expect(response.body.scenarios[0]).not.toHaveProperty("layers");
    expect(response.body.scenarios[0]).not.toHaveProperty("recommendations");
  });

  it("resolves a scenario by slug with canonical products", async () => {
    const response = await request(app).get("/api/scenarios/bedroom-quieter-interior-wall").expect(200);
    expect(response.body.scenario.layers[0].products[0].slug).toBe("acoustic-interior-board");
    expect(response.body.scenario.recommendations[0].product.slug).toBe("acoustic-interior-board");
  });

  it("returns the same result through deterministic recommendation lookup", async () => {
    const bySlug = await request(app).get("/api/scenarios/bedroom-quieter-interior-wall").expect(200);
    const recommended = await request(app)
      .get("/api/recommendations?room=bedroom&need=reduce-noise")
      .expect(200);
    expect(recommended.body).toEqual(bySlug.body);
  });

  it("returns the thermal-comfort recommendation for the supported bedroom selection", async () => {
    const response = await request(app)
      .get("/api/recommendations?room=bedroom&need=improve-thermal-comfort")
      .expect(200);
    expect(response.body.scenario.slug).toBe("bedroom-thermal-comfort-interior-wall");
    expect(response.body.scenario.recommendations[0].product.slug).toBe("thermal-cavity-insulation");
  });

  it.each([
    ["missing room", "/api/recommendations?need=reduce-noise", "room"],
    ["missing need", "/api/recommendations?room=bedroom", "need"],
    ["invalid room", "/api/recommendations?room=kitchen&need=reduce-noise", "room"],
    ["invalid need", "/api/recommendations?room=bedroom&need=quiet", "need"],
    ["repeated value", "/api/recommendations?room=bedroom&room=bathroom&need=reduce-noise", "room"],
    ["unknown parameter", "/api/recommendations?room=bedroom&need=reduce-noise&element=wall", "query"],
  ])("returns 400 for %s", async (_label, url, detailKey) => {
    const response = await request(app).get(url).expect(400);
    expect(response.body.error.code).toBe("INVALID_RECOMMENDATION_QUERY");
    expect(response.body.error.details).toHaveProperty(detailKey);
  });

  it("returns 404 for a valid but unsupported combination", async () => {
    const response = await request(app)
      .get("/api/recommendations?room=bathroom&need=reduce-noise")
      .expect(404);
    expect(response.body.error.code).toBe("SCENARIO_NOT_FOUND");
  });

  it("returns 404 for an unknown scenario slug", async () => {
    const response = await request(app).get("/api/scenarios/not-a-scenario").expect(404);
    expect(response.body.error.code).toBe("SCENARIO_NOT_FOUND");
  });
});
