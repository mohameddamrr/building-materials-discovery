import { Link } from "react-router";
import { productImages } from "../products/productImages";
import type { ResolvedRecommendation } from "../../types/scenario";
import { categoryLabels } from "../../utils/productLabels";

export function RecommendationList({ recommendations }: { recommendations: ResolvedRecommendation[] }) {
  return (
    <section aria-labelledby="recommendations-heading" className="scroll-mt-6 mt-10" id="products-to-explore">
      <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Materials to explore</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl" id="recommendations-heading">Products to explore</h2><p className="mt-3 leading-7 text-slate-600">Each choice comes from the selected scenario. These fictional products illustrate discovery, not a final technical specification; final selection depends on project requirements.</p></div>
      <ul className="mt-7 grid gap-5 md:grid-cols-2">{recommendations.map(({ product, reason }) => <li key={product.id}><article className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-40 overflow-hidden bg-slate-900"><img alt="" aria-hidden="true" className="size-full object-cover opacity-80 transition duration-500 group-hover:scale-105" src={productImages[product.slug]} /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" /><p className="absolute bottom-4 left-5 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">{categoryLabels[product.category]}</p></div><div className="p-5 sm:p-6"><h3 className="text-xl font-bold text-slate-950">{product.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{reason}</p><Link aria-label="View product details" className="mt-5 inline-flex font-bold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4" to={`/products/${product.slug}`}>Explore product <span aria-hidden="true">→</span></Link></div></article></li>)}</ul>
    </section>
  );
}
