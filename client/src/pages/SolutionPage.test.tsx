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
      id: "bedroom-facing-board",
      name: "Acoustic lining board",
      materialRole: "Forms the bedroom-side face",
      explanation: "Represents the selected lining layer.",
      products: [{ id: "board", slug: "acoustic-interior-board", name: "Acoustic Interior Board", category: "boards", shortDescription: "A fictional lining board.", applications: ["interior-walls"], performanceNeeds: ["noise-reduction"], tags: ["quiet"], keyFeatures: ["Conceptual"], source: { type: "fictional" } }],
    },
    {
      id: "metal-frame",
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

const thermalScenario = {
  ...scenario,
  id: "scenario-bedroom-thermal-comfort",
  slug: "bedroom-thermal-comfort-interior-wall",
  need: "improve-thermal-comfort",
  title: "A thermal-comfort bedroom interior wall",
  summary: "A simplified thermal-comfort wall concept.",
  layers: [
    scenario.layers[0],
    {
      id: "thermal-cavity-insulation",
      name: "Thermal-focused cavity insulation",
      materialRole: "Occupies the wall cavity",
      explanation: "Represents insulation considered between differently conditioned spaces.",
      products: [{ ...scenario.layers[0].products[0], id: "thermal", slug: "thermal-cavity-insulation", name: "Thermal Cavity Insulation", category: "insulation", performanceNeeds: ["thermal-comfort"] }],
    },
    scenario.layers[1],
    {
      ...scenario.layers[0],
      id: "opposite-side-board",
      name: "Opposite-side lining board",
      explanation: "Closes the adjoining face.",
    },
  ],
  recommendations: [
    {
      product: { ...scenario.layers[0].products[0], id: "thermal", slug: "thermal-cavity-insulation", name: "Thermal Cavity Insulation", category: "insulation", performanceNeeds: ["thermal-comfort"] },
      reason: "Recommended for a wall beside a differently conditioned space.",
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
    expect(screen.getByRole("navigation", { name: "Solution guide" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "See how the wall works together" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Simplified interior-wall system-part overview/ })).toBeInTheDocument();
    expect(screen.getByText("Part 1 of 2")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What this wall concept is trying to achieve" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Products to explore" })).toBeInTheDocument();
    expect(screen.getByText(scenario.recommendations[0].reason)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Acoustic Interior Board details" })).toHaveAttribute("href", "/products/acoustic-interior-board");
    expect(screen.getByText(/final selection depends on project requirements/i)).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "Interior Wall Stud" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Interior Wall Track" })).toBeInTheDocument();
    expect(screen.getByText("Part 2 of 2")).toBeInTheDocument();
    expect(screen.getByText(/Selected part 2: Metal framing/)).toBeInTheDocument();
    expect(document.querySelector('[data-layer-id="metal-frame"]')).toHaveAttribute("data-selected", "true");
    expect(screen.getByRole("img", { name: /Metal studs and floor track/ })).toBeInTheDocument();
    expect(document.querySelectorAll('button img')).toHaveLength(0);
  });

  it("renders useful recovery for an unknown solution", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ error: { code: "SCENARIO_NOT_FOUND", message: "Not found" } }, 404)));
    renderPage();

    expect(await screen.findByRole("heading", { name: "Solution not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Change my choices" })).toHaveAttribute("href", "/discover");
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });

  it("reuses the visual explorer for all thermal-comfort wall parts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenario: thermalScenario })));
    const user = userEvent.setup();
    renderPage();

    expect(await screen.findByRole("heading", { level: 1, name: thermalScenario.title })).toBeInTheDocument();
    const insulation = screen.getByRole("button", { name: /Thermal-focused cavity insulation/ });
    expect(screen.getAllByRole("button", { name: /Part/ })).toHaveLength(4);

    await user.click(insulation);

    expect(insulation).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: /glass-wool insulation material/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Thermal Cavity Insulation" })).toHaveAttribute("href", "/products/thermal-cavity-insulation");
    expect(document.querySelector('[data-layer-id="thermal-cavity-insulation"]')).toHaveAttribute("data-selected", "true");
  });
});
