import { Link, useParams } from "react-router";
import { productImages } from "../components/products/productImages";
import { useProduct } from "../hooks/useProduct";
import { applicationLabels, categoryLabels, performanceNeedLabels } from "../utils/productLabels";

export function ProductDetailPage() {
  const { slug = "" } = useParams();
  const { product, status, retry } = useProduct(slug);

  if (status === "loading") return <p className="rounded-2xl bg-white p-5 text-slate-600 shadow-sm" role="status">Loading product…</p>;
  if (status === "not-found") return <section><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Product catalogue</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Product not found</h1><p className="mt-4 text-lg text-slate-600">This product may no longer exist, or the address may be incorrect.</p><Link className="mt-8 inline-flex font-semibold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4" to="/products">Back to products</Link></section>;
  if (status === "error" || !product) return <section className="rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><h1 className="text-2xl font-bold text-red-950">We couldn’t load this product.</h1><p className="mt-2 text-red-900">Check the connection and try again.</p><button className="mt-5 rounded-full bg-slate-950 px-5 py-2.5 font-semibold text-white hover:bg-slate-800" onClick={retry} type="button">Try again</button></section>;

  return (
    <article>
      <Link className="font-semibold text-slate-700 underline decoration-amber-500 decoration-2 underline-offset-4" to="/products">← Back to products</Link>
      <div className="mt-7 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5 lg:grid lg:grid-cols-2">
        <div className="relative min-h-80 bg-slate-900 lg:min-h-[34rem]"><img alt={`Representative image of ${product.name}`} className="absolute inset-0 size-full object-cover" src={productImages[product.slug]} /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" /><p className="absolute bottom-6 left-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-slate-950">{categoryLabels[product.category]}</p></div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Material overview</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{product.name}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{product.shortDescription}</p>{product.performanceNeeds.length > 0 && <ul className="mt-7 flex flex-wrap gap-2" aria-label="Performance priorities">{product.performanceNeeds.map((need) => <li className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-bold text-amber-950" key={need}>{performanceNeedLabels[need]}</li>)}</ul>}</div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-950">Where it is used</h2><ul className="mt-5 space-y-3">{product.applications.map((application) => <li className="flex gap-3 text-slate-700" key={application}><span className="mt-2 size-2 shrink-0 rounded-full bg-amber-400" />{applicationLabels[application]}</li>)}</ul></section>
        <section className="rounded-2xl bg-[#101820] p-6 text-white"><h2 className="text-xl font-bold">System role</h2><p className="mt-5 leading-7 text-slate-300">This product represents one material within a complete interior-wall concept. Its suitability depends on the wider system and project requirements.</p></section>
      </div>
      <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6" aria-labelledby="product-at-a-glance">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">At a glance</p><h2 className="mt-2 text-2xl font-bold text-slate-950" id="product-at-a-glance">What this material brings to the system</h2></div>
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-600">{product.applications.length} application{product.applications.length === 1 ? "" : "s"}</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Category</p><p className="mt-2 font-bold text-slate-950">{categoryLabels[product.category]}</p></div>
          <div className="rounded-xl bg-white p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Best for</p><p className="mt-2 font-bold text-slate-950">{product.performanceNeeds.length > 0 ? performanceNeedLabels[product.performanceNeeds[0]] : "General build-up"}</p></div>
          <div className="rounded-xl bg-white p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">System fit</p><p className="mt-2 font-bold text-slate-950">Interior wall concept</p></div>
        </div>
        {product.tags.length > 0 && <div className="mt-5 flex flex-wrap gap-2" aria-label="Product tags">{product.tags.map((tag) => <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600" key={tag}>#{tag}</span>)}</div>}
      </section>
      <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">What to know</p><h2 className="mt-2 text-2xl font-bold text-slate-950">Key features</h2><ul className="mt-6 grid gap-4 sm:grid-cols-2">{product.keyFeatures.map((feature, index) => <li className="rounded-xl bg-[#f4f1eb] p-4 text-slate-700" key={feature}><span className="text-sm font-black text-amber-700">0{index + 1}</span><p className="mt-2 leading-6">{feature}</p></li>)}</ul></section>
      <aside className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950" aria-label="Product data source">{product.source.type === "fictional" ? <p>Fictional product created for this prototype. It is not affiliated with a manufacturer.</p> : <p>Product information is based on a <a className="font-semibold underline" href={product.source.url}>public source</a>.</p>}</aside>
    </article>
  );
}
