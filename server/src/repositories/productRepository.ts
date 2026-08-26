import productData from "../data/products.json" with { type: "json" };
import type { Product } from "../types/product.js";

const products = productData as Product[];

export function findAllProducts(): readonly Product[] {
  return products;
}

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

