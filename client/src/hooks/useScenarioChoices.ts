import { useCallback, useEffect, useState } from "react";
import { getScenarioSummaries } from "../services/scenariosApi";
import type { ScenarioSummary } from "../types/scenario";

export function useScenarioChoices() {
  const [scenarios, setScenarios] = useState<ScenarioSummary[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);
  const retry = useCallback(() => setRetryCount((count) => count + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadChoices() {
      setStatus("loading");
      try {
        const result = await getScenarioSummaries(controller.signal);
        setScenarios(result);
        setStatus("success");
      } catch (error: unknown) {
        if (!(error instanceof DOMException && error.name === "AbortError")) setStatus("error");
      }
    }
    void loadChoices();
    return () => controller.abort();
  }, [retryCount]);

  return { scenarios, status, retry };
}
