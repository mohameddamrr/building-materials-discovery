import { Link } from "react-router";
import type { Product } from "../../types/product";
import { categoryLabels, performanceNeedLabels } from "../../utils/productLabels";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{categoryLabels[product.category]}</p>
      <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-950">{product.name}</h2>
      <p className="mt-3 flex-1 leading-7 text-slate-600">{product.shortDescription}</p>
      {product.performanceNeeds.length > 0 && (
        <ul aria-label="Performance needs" className="mt-5 flex flex-wrap gap-2">
          {product.performanceNeeds.map((need) => (
            <li className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={need}>
              {performanceNeedLabels[need]}
            </li>
          ))}
        </ul>
      )}
      <Link className="mt-6 inline-flex font-semibold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4" to={`/products/${product.slug}`}>
        View {product.name}
        <span aria-hidden="true">&nbsp;→</span>
      </Link>
    </article>
  );
}
