import { findAllProducts, findProductBySlug } from "../repositories/productRepository.js";
import type { Product, ProductQuery } from "../types/product.js";

export function getProducts(query: ProductQuery): Product[] {
  return filterProducts(findAllProducts(), query);
}

export function getProductBySlug(slug: string): Product | undefined {
  return findProductBySlug(slug);
}

export function filterProducts(products: readonly Product[], query: ProductQuery): Product[] {
  const searchTerm = query.q?.trim().toLocaleLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !searchTerm || searchableValues(product).some((value) => value.toLocaleLowerCase().includes(searchTerm));
    const matchesCategory = !query.category || product.category === query.category;
    const matchesNeed = !query.need || product.performanceNeeds.includes(query.need);

    return matchesSearch && matchesCategory && matchesNeed;
  });
}

function searchableValues(product: Product): string[] {
  return [
    product.name,
    product.category,
    product.shortDescription,
    ...product.tags,
    ...product.applications,
    ...product.performanceNeeds,
  ];
}

