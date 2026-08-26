import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SolutionPage } from "./SolutionPage";

const scenario = {
  id: "scenario-bedroom-noise",
  slug: "bedroom-quieter-interior-wall",
  room: "bedroom",
  element: "interior-wall",
  need: "reduce-noise",
  title: "A quieter bedroom interior wall",
  summary: "A simplified noise-focused wall concept.",
  performancePriorities: ["Treat the wall as a complete system"],
  layers: [],
  recommendations: [],
};

function response(body: unknown, status = 200): Response {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

function renderPage() {
  return render(<MemoryRouter initialEntries={[`/solutions/${scenario.slug}`]}><Routes><Route path="/solutions/:scenarioSlug" element={<SolutionPage />} /></Routes></MemoryRouter>);
}

afterEach(() => vi.unstubAllGlobals());

describe("SolutionPage Phase 4 foundation", () => {
  it("renders the selected context, phase boundary, and disclaimer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenario })));
    renderPage();

    expect(await screen.findByRole("heading", { level: 1, name: scenario.title })).toBeInTheDocument();
    expect(screen.getByText("Bedroom")).toBeInTheDocument();
    expect(screen.getByText("Reduce noise between spaces")).toBeInTheDocument();
    expect(screen.getByText(/interactive wall layers and product recommendations will be added/)).toBeInTheDocument();
    expect(screen.getByText(/Final system and material selection depends/)).toBeInTheDocument();
  });

  it("renders useful recovery for an unknown solution", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ error: { code: "SCENARIO_NOT_FOUND", message: "Not found" } }, 404)));
    renderPage();

    expect(await screen.findByRole("heading", { name: "Solution not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Change my choices" })).toHaveAttribute("href", "/discover");
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });
});

