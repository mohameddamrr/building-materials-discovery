import { useCallback, useEffect, useState } from "react";
import { ApiError, getProduct } from "../services/productsApi";
import type { Product } from "../types/product";

type RequestStatus = "loading" | "success" | "not-found" | "error";

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => setRetryCount((count) => count + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setStatus("loading");

      try {
        const response = await getProduct(slug, controller.signal);
        setProduct(response);
        setStatus("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;

        setProduct(null);
        setStatus(error instanceof ApiError && error.status === 404 ? "not-found" : "error");
      }
    }

    void loadProduct();
    return () => controller.abort();
  }, [slug, retryCount]);

  return { product, status, retry };
}

