import { Link } from "react-router";
import type { Product } from "../../types/product";
import { categoryLabels, performanceNeedLabels } from "../../utils/productLabels";
import { productImages } from "./productImages";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 motion-safe:transition-transform motion-safe:hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden bg-slate-900">
        <img alt="" aria-hidden="true" className="size-full object-cover opacity-85 motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-105" src={productImages[product.slug]} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <p className="absolute bottom-4 left-5 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">{categoryLabels[product.category]}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold tracking-tight text-slate-950">{product.name}</h2>
        <p className="mt-3 flex-1 leading-7 text-slate-600">{product.shortDescription}</p>
        {product.performanceNeeds.length > 0 && (
          <ul aria-label="Performance needs" className="mt-5 flex flex-wrap gap-2">
            {product.performanceNeeds.map((need) => <li className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={need}>{performanceNeedLabels[need]}</li>)}
          </ul>
        )}
        <Link aria-label={`View ${product.name}`} className="mt-6 inline-flex font-bold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4" to={`/products/${product.slug}`}>Explore product <span aria-hidden="true">&nbsp;→</span></Link>
      </div>
    </article>
  );
}
