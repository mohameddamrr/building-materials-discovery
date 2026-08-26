import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "../types/product";
import { ProductsPage } from "./ProductsPage";

const products: Product[] = [
  {
    id: "board",
    slug: "acoustic-interior-board",
    name: "Acoustic Interior Board",
    category: "boards",
    shortDescription: "A fictional board for quieter wall concepts.",
    applications: ["interior-walls"],
    performanceNeeds: ["noise-reduction"],
    tags: ["quiet"],
    keyFeatures: ["Works as part of a wall concept"],
    source: { type: "fictional" },
  },
  {
    id: "insulation",
    slug: "thermal-cavity-insulation",
    name: "Thermal Cavity Insulation",
    category: "insulation",
    shortDescription: "A fictional cavity layer.",
    applications: ["interior-walls"],
    performanceNeeds: ["thermal-comfort"],
    tags: ["warmth"],
    keyFeatures: ["Used within the wall concept"],
    source: { type: "fictional" },
  },
];

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

function renderPage(initialEntry = "/products") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ProductsPage />
    </MemoryRouter>,
  );
}

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ products, total: products.length })));
  });

  afterEach(() => vi.unstubAllGlobals());

  it("renders labelled controls, loading feedback, result count, and product links", async () => {
    renderPage();

    expect(screen.getByRole("status")).toHaveTextContent("Loading products");
    expect(screen.getByLabelText("Search products")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Performance need")).toBeInTheDocument();

    expect(await screen.findByText("2 products")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Acoustic Interior Board" })).toHaveAttribute(
      "href",
      "/products/acoustic-interior-board",
    );
  });

  it("submits trimmed search text through the API URL", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByText("2 products");

    await user.type(screen.getByLabelText("Search products"), "  quiet  ");
    await user.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenLastCalledWith("/api/products?q=quiet", expect.any(Object));
    });
  });

  it("combines category and need selections in the request", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByText("2 products");

    await user.selectOptions(screen.getByLabelText("Category"), "boards");
    await user.selectOptions(screen.getByLabelText("Performance need"), "noise-reduction");

    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenLastCalledWith(
        "/api/products?category=boards&need=noise-reduction",
        expect.any(Object),
      );
    });
  });

  it("shows an empty state and clears the active query", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(jsonResponse({ products: [], total: 0 }))
      .mockResolvedValueOnce(jsonResponse({ products, total: products.length }));
    const user = userEvent.setup();
    renderPage("/products?q=unknown");

    expect(await screen.findByText("No products match your search and filters.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clear search and filters" }));

    expect(await screen.findByText("2 products")).toBeInTheDocument();
    expect(screen.getByLabelText("Search products")).toHaveValue("");
  });

  it("shows an error and retries the same request", async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(jsonResponse({ products, total: products.length }));
    const user = userEvent.setup();
    renderPage("/products?category=boards");

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn’t load the products");
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByText("2 products")).toBeInTheDocument();
    expect(vi.mocked(fetch)).toHaveBeenLastCalledWith("/api/products?category=boards", expect.any(Object));
  });

  it("rejects a malformed successful API response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ products: [{ name: "Incomplete" }], total: 1 }));
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn’t load the products");
  });

  it("ignores invalid URL filters and offers recovery", async () => {
    const user = userEvent.setup();
    renderPage("/products?category=unknown&extra=value");

    expect(await screen.findByText("Some filters in this link were not supported and were ignored.")).toBeInTheDocument();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith("/api/products", expect.any(Object));
    await user.click(screen.getByRole("button", { name: "Use valid filters" }));
    expect(screen.queryByText("Some filters in this link were not supported and were ignored.")).not.toBeInTheDocument();
  });
});
