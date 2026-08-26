import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";
import type { Product, ProductQuery } from "../types/product";

type RequestStatus = "loading" | "success" | "error";

export function useProducts(query: ProductQuery) {
  const { q, category, need } = query;
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => setRetryCount((count) => count + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setStatus("loading");

      try {
        const response = await getProducts({ q, category, need }, controller.signal);
        setProducts(response.products);
        setStatus("success");
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setProducts([]);
          setStatus("error");
        }
      }
    }

    void loadProducts();
    return () => controller.abort();
  }, [category, need, q, retryCount]);

  return { products, total: products.length, status, retry };
}
