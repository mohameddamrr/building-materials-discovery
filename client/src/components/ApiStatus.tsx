import { useCallback, useEffect, useState } from "react";
import { getHealth } from "../services/api";

type RequestState = "loading" | "connected" | "error";

export function ApiStatus() {
  const [requestState, setRequestState] = useState<RequestState>("loading");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setRequestState("loading");
    setAttempt((currentAttempt) => currentAttempt + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function checkApi() {
      try {
        await getHealth(controller.signal);
        setRequestState("connected");
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setRequestState("error");
        }
      }
    }

    void checkApi();

    return () => controller.abort();
  }, [attempt]);

  return (
    <div className="mt-10 rounded-sm border border-slate-200 bg-white p-5" role="status">
      <p className="text-sm font-semibold text-slate-950">API connection</p>
      {requestState === "loading" && (
        <p className="mt-1 text-sm text-slate-600">Checking the Express server…</p>
      )}
      {requestState === "connected" && (
        <p className="mt-1 text-sm text-emerald-800">Connected to the Express server.</p>
      )}
      {requestState === "error" && (
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <p className="text-sm text-red-800">The Express server is unavailable.</p>
          <button
            className="rounded-sm border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-100"
            onClick={retry}
            type="button"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

