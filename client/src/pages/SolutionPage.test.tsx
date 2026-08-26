import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  performancePriorities: ["Treat the wall as a complete system", "Keep the surface practical to finish"],
  layers: [
    {
      id: "lining",
      name: "Acoustic lining board",
      materialRole: "Forms the bedroom-side face",
      explanation: "Represents the selected lining layer.",
      products: [{ id: "board", slug: "acoustic-interior-board", name: "Acoustic Interior Board", category: "boards", shortDescription: "A fictional lining board.", applications: ["interior-walls"], performanceNeeds: ["noise-reduction"], tags: ["quiet"], keyFeatures: ["Conceptual"], source: { type: "fictional" } }],
    },
    {
      id: "frame",
      name: "Metal framing",
      materialRole: "Organizes the wall faces",
      explanation: "Creates space for the cavity layer.",
      products: [
        { id: "stud", slug: "interior-wall-stud", name: "Interior Wall Stud", category: "framing", shortDescription: "A fictional stud.", applications: ["interior-walls"], performanceNeeds: [], tags: ["stud"], keyFeatures: ["Conceptual"], source: { type: "fictional" } },
        { id: "track", slug: "interior-wall-track", name: "Interior Wall Track", category: "framing", shortDescription: "A fictional track.", applications: ["interior-walls"], performanceNeeds: [], tags: ["track"], keyFeatures: ["Conceptual"], source: { type: "fictional" } },
      ],
    },
  ],
  recommendations: [
    {
      product: { id: "board", slug: "acoustic-interior-board", name: "Acoustic Interior Board", category: "boards", shortDescription: "A fictional lining board.", applications: ["interior-walls"], performanceNeeds: ["noise-reduction"], tags: ["quiet"], keyFeatures: ["Conceptual"], source: { type: "fictional" } },
      reason: "Recommended because this scenario prioritizes acoustic comfort.",
    },
  ],
};

function response(body: unknown, status = 200): Response {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

function renderPage() {
  return render(<MemoryRouter initialEntries={[`/solutions/${scenario.slug}`]}><Routes><Route path="/solutions/:scenarioSlug" element={<SolutionPage />} /></Routes></MemoryRouter>);
}

afterEach(() => vi.unstubAllGlobals());

describe("SolutionPage construction experience", () => {
  it("renders context, layers, priorities, recommendations, and disclaimer", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenario })));
    renderPage();

    expect(await screen.findByRole("heading", { level: 1, name: scenario.title })).toBeInTheDocument();
    expect(screen.getByText("Bedroom")).toBeInTheDocument();
    expect(screen.getByText("Reduce noise between spaces")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How this wall is layered" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What matters for this need" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Products used in this concept" })).toBeInTheDocument();
    expect(screen.getByText(scenario.recommendations[0].reason)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Acoustic Interior Board details" })).toHaveAttribute("href", "/products/acoustic-interior-board");
    expect(screen.getByText(/Final system and material selection depends/)).toBeInTheDocument();
  });

  it("selects layers with native buttons and updates explanation and related products", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenario })));
    const user = userEvent.setup();
    renderPage();

    const firstLayer = await screen.findByRole("button", { name: /Acoustic lining board/ });
    const frameLayer = screen.getByRole("button", { name: /Metal framing/ });
    expect(firstLayer).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Represents the selected lining layer.")).toBeInTheDocument();

    frameLayer.focus();
    await user.keyboard(" ");

    expect(frameLayer).toHaveAttribute("aria-pressed", "true");
    expect(firstLayer).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("Creates space for the cavity layer.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Interior Wall Stud" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Interior Wall Track" })).toBeInTheDocument();
  });

  it("renders useful recovery for an unknown solution", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ error: { code: "SCENARIO_NOT_FOUND", message: "Not found" } }, 404)));
    renderPage();

    expect(await screen.findByRole("heading", { name: "Solution not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Change my choices" })).toHaveAttribute("href", "/discover");
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });
});
