import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("products API", () => {
  it("lists all curated products", async () => {
    const response = await request(app).get("/api/products").expect(200);

    expect(response.body.total).toBe(9);
    expect(response.body.products).toHaveLength(9);
  });

  it("searches using plain-language terms", async () => {
    const response = await request(app).get("/api/products").query({ q: "quiet" }).expect(200);

    expect(response.body.products.map((product: { slug: string }) => product.slug)).toEqual([
      "acoustic-interior-board",
      "acoustic-cavity-insulation",
    ]);
  });

  it("combines category and performance-need filters", async () => {
    const response = await request(app)
      .get("/api/products")
      .query({ category: "boards", need: "moisture-resistance" })
      .expect(200);

    expect(response.body.total).toBe(1);
    expect(response.body.products[0].slug).toBe("moisture-aware-interior-board");
  });

  it("returns an empty successful result for valid filters with no matches", async () => {
    const response = await request(app)
      .get("/api/products")
      .query({ category: "finishing", need: "thermal-comfort" })
      .expect(200);

    expect(response.body).toEqual({ products: [], total: 0 });
  });

  it.each([
    ["unsupported category", "/api/products?category=timber", "category"],
    ["unsupported need", "/api/products?need=noise", "need"],
    ["repeated parameter", "/api/products?category=boards&category=framing", "category"],
    ["unknown parameter", "/api/products?categry=boards", "query"],
  ])("returns 400 for %s", async (_label, url, detailKey) => {
    const response = await request(app).get(url).expect(400);

    expect(response.body.error.code).toBe("INVALID_QUERY");
    expect(response.body.error.details).toHaveProperty(detailKey);
  });

  it("retrieves a product by slug", async () => {
    const response = await request(app).get("/api/products/acoustic-interior-board").expect(200);

    expect(response.body.product.name).toBe("Acoustic Interior Board");
  });

  it("returns a product-specific 404 for an unknown slug", async () => {
    const response = await request(app).get("/api/products/not-a-product").expect(404);

    expect(response.body.error.code).toBe("PRODUCT_NOT_FOUND");
  });

  it("retains the generic API 404 contract", async () => {
    const response = await request(app).get("/api/unknown").expect(404);

    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("returns 400 for malformed JSON", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Content-Type", "application/json")
      .send('{"broken":')
      .expect(400);

    expect(response.body.error.code).toBe("INVALID_JSON");
  });
});

