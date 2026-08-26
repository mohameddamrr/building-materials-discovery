import {
  performanceNeeds,
  productCategories,
  type PerformanceNeed,
  type Product,
  type ProductCategory,
  type ProductQuery,
  type ProductResponse,
  type ProductsResponse,
} from "../types/product";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getProducts(query: ProductQuery, signal?: AbortSignal): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (query.q) searchParams.set("q", query.q);
  if (query.category) searchParams.set("category", query.category);
  if (query.need) searchParams.set("need", query.need);

  const queryString = searchParams.toString();
  const response = await fetch(`/api/products${queryString ? `?${queryString}` : ""}`, { signal });
  const data: unknown = await readJson(response);

  if (!response.ok) {
    throw toApiError(response.status, data);
  }

  if (!isProductsResponse(data)) {
    throw new ApiError(response.status, "INVALID_RESPONSE", "The products response was not valid.");
  }

  return data;
}

export async function getProduct(slug: string, signal?: AbortSignal): Promise<Product> {
  const response = await fetch(`/api/products/${encodeURIComponent(slug)}`, { signal });
  const data: unknown = await readJson(response);

  if (!response.ok) {
    throw toApiError(response.status, data);
  }

  if (!isProductResponse(data)) {
    throw new ApiError(response.status, "INVALID_RESPONSE", "The product response was not valid.");
  }

  return data.product;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new ApiError(response.status, "INVALID_RESPONSE", "The server returned an unreadable response.");
  }
}

function toApiError(status: number, data: unknown): ApiError {
  if (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof data.error === "object" &&
    data.error !== null &&
    "code" in data.error &&
    "message" in data.error &&
    typeof data.error.code === "string" &&
    typeof data.error.message === "string"
  ) {
    return new ApiError(status, data.error.code, data.error.message);
  }

  return new ApiError(status, "REQUEST_FAILED", "The request could not be completed.");
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "products" in value &&
    Array.isArray(value.products) &&
    value.products.every(isProduct) &&
    "total" in value &&
    typeof value.total === "number" &&
    Number.isInteger(value.total) &&
    value.total >= 0 &&
    value.total === value.products.length
  );
}

function isProductResponse(value: unknown): value is ProductResponse {
  return typeof value === "object" && value !== null && "product" in value && isProduct(value.product);
}

function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "slug" in value &&
    typeof value.slug === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "category" in value && isProductCategory(value.category) &&
    "shortDescription" in value &&
    typeof value.shortDescription === "string" &&
    "applications" in value && isStringArray(value.applications) && value.applications.every((item) => item === "interior-walls") &&
    "performanceNeeds" in value && isStringArray(value.performanceNeeds) && value.performanceNeeds.every(isPerformanceNeed) &&
    "tags" in value && isStringArray(value.tags) &&
    "keyFeatures" in value && isStringArray(value.keyFeatures) &&
    "source" in value && isProductSource(value.source)
  );
}

function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === "string" && productCategories.some((category) => category === value);
}

function isPerformanceNeed(value: string): value is PerformanceNeed {
  return performanceNeeds.some((need) => need === value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isProductSource(value: unknown): value is Product["source"] {
  if (typeof value !== "object" || value === null || !("type" in value)) return false;
  if (value.type === "fictional") return !("url" in value);
  return value.type === "public-source" && "url" in value && typeof value.url === "string" && value.url.length > 0;
}
