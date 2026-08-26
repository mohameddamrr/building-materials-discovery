import type { RequestHandler } from "express";
import { getProductBySlug, getProducts } from "../services/productService.js";
import type { ApiErrorBody } from "../types/api.js";
import {
  performanceNeeds,
  productCategories,
  type PerformanceNeed,
  type ProductCategory,
  type ProductQuery,
} from "../types/product.js";

const allowedQueryParameters = new Set(["q", "category", "need"]);

export const listProducts: RequestHandler = (request, response) => {
  const parsedQuery = parseProductQuery(request.query);

  if (!parsedQuery.ok) {
    response.status(400).json(parsedQuery.error);
    return;
  }

  const products = getProducts(parsedQuery.value);
  response.status(200).json({ products, total: products.length });
};

export const getProduct: RequestHandler = (request, response) => {
  const slug = request.params.slug;
  const product = typeof slug === "string" ? getProductBySlug(slug) : undefined;

  if (!product) {
    response.status(404).json({
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: "The requested product was not found.",
      },
    } satisfies ApiErrorBody);
    return;
  }

  response.status(200).json({ product });
};

type QueryInput = Record<string, unknown>;
type ParsedQuery = { ok: true; value: ProductQuery } | { ok: false; error: ApiErrorBody };

export function parseProductQuery(query: QueryInput): ParsedQuery {
  const details: Record<string, string> = {};
  const unknownKeys = Object.keys(query).filter((key) => !allowedQueryParameters.has(key));

  if (unknownKeys.length > 0) {
    details.query = `Unsupported parameter${unknownKeys.length === 1 ? "" : "s"}: ${unknownKeys.join(", ")}.`;
  }

  const q = parseOptionalSearch(query.q, details);
  const category = parseEnumValue(query.category, "category", productCategories, details);
  const need = parseEnumValue(query.need, "need", performanceNeeds, details);

  if (Object.keys(details).length > 0) {
    return {
      ok: false,
      error: {
        error: {
          code: "INVALID_QUERY",
          message: "One or more product query parameters are invalid.",
          details,
        },
      },
    };
  }

  return {
    ok: true,
    value: {
      ...(q ? { q } : {}),
      ...(category ? { category: category as ProductCategory } : {}),
      ...(need ? { need: need as PerformanceNeed } : {}),
    },
  };
}

function parseOptionalSearch(value: unknown, details: Record<string, string>): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    details.q = "Search must be provided once as text.";
    return undefined;
  }

  return value.trim() || undefined;
}

function parseEnumValue<T extends string>(
  value: unknown,
  name: string,
  supportedValues: readonly T[],
  details: Record<string, string>,
): T | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || !supportedValues.includes(value as T)) {
    details[name] = `Supported values are ${supportedValues.join(", ")}.`;
    return undefined;
  }

  return value as T;
}

