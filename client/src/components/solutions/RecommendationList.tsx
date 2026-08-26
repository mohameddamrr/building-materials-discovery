import { Link } from "react-router";
import type { ResolvedRecommendation } from "../../types/scenario";
import { categoryLabels, performanceNeedLabels } from "../../utils/productLabels";

export function RecommendationList({ recommendations }: { recommendations: ResolvedRecommendation[] }) {
  return (
    <section aria-labelledby="recommendations-heading" className="mt-12">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Explore products</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="recommendations-heading">Products used in this concept</h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-600">These products are curated starting points for understanding the scenario, not a final specification.</p>
      <ul className="mt-6 grid gap-5 md:grid-cols-2">
        {recommendations.map(({ product, reason }) => (
          <li key={product.id}>
            <article className="h-full rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{categoryLabels[product.category]}</p>
              <h3 className="mt-3 text-xl font-bold text-slate-950">{product.name}</h3>
              <p className="mt-4 text-sm font-bold text-slate-800">Why it is relevant</p>
              <p className="mt-1 leading-7 text-slate-700">{reason}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
              {product.performanceNeeds.length > 0 && <ul aria-label="Performance needs" className="mt-4 flex flex-wrap gap-2">{product.performanceNeeds.map((need) => <li className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700" key={need}>{performanceNeedLabels[need]}</li>)}</ul>}
              <Link className="mt-6 inline-flex font-semibold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4" to={`/products/${product.slug}`}>View {product.name} details</Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

