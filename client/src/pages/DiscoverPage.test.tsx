import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DiscoverPage } from "./DiscoverPage";

const summaries = [
  { slug: "bedroom-quieter-interior-wall", room: "bedroom", element: "interior-wall", need: "reduce-noise", title: "A quieter bedroom interior wall", summary: "Bedroom summary" },
  { slug: "bathroom-moisture-aware-interior-wall", room: "bathroom", element: "interior-wall", need: "manage-moisture", title: "A moisture-aware bathroom interior wall", summary: "Bathroom summary" },
];

function response(body: unknown, status = 200): Response {
  return { ok: status >= 200 && status < 300, status, json: async () => body } as Response;
}

function LocationView() {
  return <p>Location: {useLocation().pathname}</p>;
}

function renderPage() {
  return render(<MemoryRouter initialEntries={["/discover"]}><Routes><Route path="/discover" element={<DiscoverPage />} /><Route path="/solutions/:slug" element={<LocationView />} /></Routes></MemoryRouter>);
}

afterEach(() => vi.unstubAllGlobals());

describe("DiscoverPage", () => {
  it("loads supported choices and navigates after a deterministic recommendation", async () => {
    vi.stubGlobal("fetch", vi.fn((input: string | URL | Request) => {
      const url = String(input);
      if (url === "/api/scenarios") return Promise.resolve(response({ scenarios: summaries, total: 2 }));
      return Promise.resolve(response({ scenario: { ...summaries[0], id: "scenario-bedroom-noise", performancePriorities: [], layers: [], recommendations: [] } }));
    }));
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("radio", { name: /Bedroom/ }));
    expect(screen.getByRole("button", { name: "Show my wall solution" })).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: "Reduce noise between spaces" }));
    await user.click(screen.getByRole("button", { name: "Show my wall solution" }));

    expect(await screen.findByText("Location: /solutions/bedroom-quieter-interior-wall")).toBeInTheDocument();
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "/api/recommendations?room=bedroom&need=reduce-noise",
      expect.any(Object),
    );
  });

  it("clears the selected need when the room changes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response({ scenarios: summaries, total: 2 })));
    const user = userEvent.setup();
    renderPage();

    await user.click(await screen.findByRole("radio", { name: /Bedroom/ }));
    await user.click(screen.getByRole("radio", { name: "Reduce noise between spaces" }));
    expect(screen.getByRole("button", { name: "Show my wall solution" })).toBeEnabled();
    await user.click(screen.getByRole("radio", { name: /Bathroom/ }));

    expect(screen.getByRole("button", { name: "Show my wall solution" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "Manage moisture" })).not.toBeChecked();
  });

  it("shows recovery when guided choices fail to load", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    renderPage();

    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn’t load the guided choices");
    expect(screen.getByRole("link", { name: "Browse products" })).toHaveAttribute("href", "/products");
  });
});

