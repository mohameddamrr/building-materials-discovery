import type { Product } from "../../types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}><ProductCard product={product} /></li>
      ))}
    </ul>
  );
}

