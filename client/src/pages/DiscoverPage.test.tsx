import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DiscoverPage } from "./DiscoverPage";

const summaries = [
  { slug: "bedroom-quieter-interior-wall", room: "bedroom", element: "interior-wall", need: "reduce-noise", title: "A quieter bedroom interior wall", summary: "Explore a simplified acoustic-comfort wall concept." },
  { slug: "bedroom-thermal-comfort-interior-wall", room: "bedroom", element: "interior-wall", need: "improve-thermal-comfort", title: "A thermal-comfort bedroom interior wall", summary: "Explore a simplified thermal-comfort wall concept." },
  { slug: "bathroom-moisture-aware-interior-wall", room: "bathroom", element: "interior-wall", need: "manage-moisture", title: "A moisture-aware bathroom interior wall", summary: "Explore a simplified moisture-aware wall concept." },
];

function response(body: unknown, status = 200): Response {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

function resolvedThermalScenario() {
  return { ...summaries[1], id: "scenario-bedroom-thermal-comfort", performancePriorities: [], layers: [], recommendations: [] };
}

function LocationView() {
  return <p>Location: {useLocation().pathname}</p>;
}

function renderPage() {
  return render(<MemoryRouter initialEntries={["/discover"]}><Routes><Route path="/discover" element={<DiscoverPage />} /><Route path="/solutions/:slug" element={<LocationView />} /></Routes></MemoryRouter>);
}

afterEach(() => vi.unstubAllGlobals());

describe("DiscoverPage", () => {
  it("derives unique rooms, reveals dependent problems, and opens the thermal recommendation", async () => {
    vi.stubGlobal("fetch", vi.fn((input: string | URL | Request) => {
      if (String(input) === "/api/scenarios") return Promise.resolve(response({ scenarios: summaries, total: 3 }));
      return Promise.resolve(response({ scenario: resolvedThermalScenario() }));
    }));
    const user = userEvent.setup();
    renderPage();

    const wall = await screen.findByRole("button", { name: /Walls.*Available/ });
    expect(screen.getByRole("button", { name: /Roof.*Coming soon/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Improve thermal comfort/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Show my wall solution" })).not.toBeInTheDocument();

    await user.click(wall);
    expect(screen.getByRole("heading", { name: "Where is the wall?" })).toHaveFocus();
    await user.click(screen.getByRole("button", { name: /Interior.*Available/ }));
    expect(screen.getByRole("heading", { name: "Which space is it?" })).toHaveFocus();
    const bedroom = await screen.findByRole("button", { name: /Bedroom.*2 problems/ });
    await user.click(bedroom);
    expect(screen.getByRole("heading", { name: /What would you like to improve/ })).toHaveFocus();
    expect(screen.getByRole("button", { name: /Reduce noise between spaces/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Improve thermal comfort/ }));
    await user.click(screen.getByRole("button", { name: "Show my wall solution" }));

    expect(await screen.findByText("Location: /solutions/bedroom-thermal-comfort-interior-wall")).toBeInTheDocument();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "/api/recommendations?room=bedroom&need=improve-thermal-comfort",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("clears a stale problem when the selected room changes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenarios: summaries, total: 3 })));
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: /Walls.*Available/ }));
    await user.click(screen.getByRole("button", { name: /Interior.*Available/ }));
    await user.click(screen.getByRole("button", { name: /Bedroom.*2 problems/ }));
    await user.click(screen.getByRole("button", { name: /Improve thermal comfort/ }));
    expect(screen.getByRole("button", { name: "Show my wall solution" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "← Back to room selection" }));
    await user.click(screen.getByRole("button", { name: /Bathroom.*1 problem/ }));

    expect(screen.queryByRole("button", { name: /Improve thermal comfort/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Manage moisture/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show my wall solution" })).toBeDisabled();
  });

  it("announces recommendation loading and prevents duplicate changes", async () => {
    let resolveRecommendation!: (value: Response) => void;
    const pendingRecommendation = new Promise<Response>((resolve) => { resolveRecommendation = resolve; });
    vi.stubGlobal("fetch", vi.fn((input: string | URL | Request) => {
      if (String(input) === "/api/scenarios") return Promise.resolve(response({ scenarios: summaries, total: 3 }));
      return pendingRecommendation;
    }));
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: /Walls.*Available/ }));
    await user.click(screen.getByRole("button", { name: /Interior.*Available/ }));
    await user.click(screen.getByRole("button", { name: /Bedroom.*2 problems/ }));
    await user.click(screen.getByRole("button", { name: /Improve thermal comfort/ }));
    await user.click(screen.getByRole("button", { name: "Show my wall solution" }));

    expect(screen.getByRole("status")).toHaveTextContent("Finding A thermal-comfort bedroom interior wall");
    expect(screen.getByRole("button", { name: "← Back to room selection" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Opening your solution..." })).toBeDisabled();

    resolveRecommendation(response({ scenario: resolvedThermalScenario() }));
    expect(await screen.findByText("Location: /solutions/bedroom-thermal-comfort-interior-wall")).toBeInTheDocument();
  });

  it("preserves the selected room and problem after an error and allows retry", async () => {
    let recommendationAttempts = 0;
    vi.stubGlobal("fetch", vi.fn((input: string | URL | Request) => {
      if (String(input) === "/api/scenarios") return Promise.resolve(response({ scenarios: summaries, total: 3 }));
      recommendationAttempts += 1;
      if (recommendationAttempts === 1) return Promise.reject(new Error("offline"));
      return Promise.resolve(response({ scenario: resolvedThermalScenario() }));
    }));
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("button", { name: /Walls.*Available/ }));
    await user.click(screen.getByRole("button", { name: /Interior.*Available/ }));
    await user.click(screen.getByRole("button", { name: /Bedroom.*2 problems/ }));
    await user.click(screen.getByRole("button", { name: /Improve thermal comfort/ }));
    await user.click(screen.getByRole("button", { name: "Show my wall solution" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Your choices are preserved");
    expect(screen.getByRole("heading", { name: /4\. What would you like to improve/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Improve thermal comfort/ })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: "Show my wall solution" }));
    expect(await screen.findByText("Location: /solutions/bedroom-thermal-comfort-interior-wall")).toBeInTheDocument();
    expect(recommendationAttempts).toBe(2);
  });

  it("shows recovery when guided choices fail to load", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn't load the guided choices");
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });

  it("shows recovery when guided choices are empty", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenarios: [], total: 0 })));
    renderPage();

    expect(await screen.findByRole("heading", { name: "No guided examples are available." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });
});
