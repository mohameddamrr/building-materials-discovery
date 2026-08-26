import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/productsApi";
import { getScenario } from "../services/scenariosApi";
import type { ResolvedScenario } from "../types/scenario";

export function useScenario(slug: string) {
  const [scenario, setScenario] = useState<ResolvedScenario | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "not-found" | "error">("loading");
  const [retryCount, setRetryCount] = useState(0);
  const retry = useCallback(() => setRetryCount((count) => count + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadScenario() {
      setStatus("loading");
      try {
        const result = await getScenario(slug, controller.signal);
        setScenario(result);
        setStatus("success");
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setScenario(null);
        setStatus(error instanceof ApiError && error.status === 404 ? "not-found" : "error");
      }
    }
    void loadScenario();
    return () => controller.abort();
  }, [retryCount, slug]);

  return { scenario, status, retry };
}
