import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "../types/product";
import { ProductDetailPage } from "./ProductDetailPage";

const product: Product = {
  id: "board",
  slug: "acoustic-interior-board",
  name: "Acoustic Interior Board",
  category: "boards",
  shortDescription: "A fictional board used in quieter wall concepts.",
  applications: ["interior-walls"],
  performanceNeeds: ["noise-reduction"],
  tags: ["quiet"],
  keyFeatures: ["Works as part of a complete wall concept"],
  source: { type: "fictional" },
};

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/products/acoustic-interior-board"]}>
      <Routes>
        <Route path="/products/:slug" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProductDetailPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ product })));
  });

  afterEach(() => vi.unstubAllGlobals());

  it("renders product details and fictional provenance", async () => {
    renderPage();

    expect(await screen.findByRole("heading", { level: 1, name: product.name })).toBeInTheDocument();
    expect(screen.getByText("Noise reduction")).toBeInTheDocument();
    expect(screen.getByText("Works as part of a complete wall concept")).toBeInTheDocument();
    expect(screen.getByText(/Fictional product created for this prototype/)).toBeInTheDocument();
  });

  it("renders a product-specific recovery state for 404", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({ error: { code: "PRODUCT_NOT_FOUND", message: "Not found" } }, 404),
    );
    renderPage();

    expect(await screen.findByRole("heading", { name: "Product not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to products" })).toHaveAttribute("href", "/products");
  });

  it("retries after a network error", async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(jsonResponse({ product }));
    const user = userEvent.setup();
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn’t load this product");
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByRole("heading", { level: 1, name: product.name })).toBeInTheDocument();
  });
});

