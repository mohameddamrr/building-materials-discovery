import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { applicationLabels, categoryLabels, performanceNeedLabels } from "../utils/productLabels";

export function ProductDetailPage() {
  const { slug = "" } = useParams();
  const { product, status, retry } = useProduct(slug);

  if (status === "loading") {
    return <p className="rounded-sm border border-slate-200 bg-white p-5 text-slate-600" role="status">Loading product…</p>;
  }

  if (status === "not-found") {
    return (
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Product catalogue</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Product not found</h1>
        <p className="mt-4 text-lg text-slate-600">This product may no longer exist, or the address may be incorrect.</p>
        <Link className="mt-8 inline-flex font-semibold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4" to="/products">Back to products</Link>
      </section>
    );
  }

  if (status === "error" || !product) {
    return (
      <section className="rounded-sm border border-red-200 bg-red-50 p-6" role="alert">
        <h1 className="text-2xl font-bold text-red-950">We couldn’t load this product.</h1>
        <p className="mt-2 text-red-900">Check the connection and try again.</p>
        <button className="mt-5 rounded-sm bg-slate-950 px-4 py-2 font-semibold text-white hover:bg-slate-800" onClick={retry} type="button">Try again</button>
      </section>
    );
  }

  return (
    <article>
      <Link className="font-semibold text-slate-700 underline decoration-amber-500 decoration-2 underline-offset-4" to="/products">← Back to products</Link>
      <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">{categoryLabels[product.category]}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{product.name}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{product.shortDescription}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-sm border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-950">Where it is used</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {product.applications.map((application) => <li key={application}>{applicationLabels[application]}</li>)}
          </ul>
        </section>

        <section className="rounded-sm border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-950">Performance priorities</h2>
          {product.performanceNeeds.length > 0 ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              {product.performanceNeeds.map((need) => <li key={need}>{performanceNeedLabels[need]}</li>)}
            </ul>
          ) : <p className="mt-4 text-slate-700">General interior-wall use</p>}
        </section>
      </div>

      <section className="mt-6 rounded-sm border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-950">Key features</h2>
        <ul className="mt-4 grid gap-3 text-slate-700 sm:grid-cols-2">
          {product.keyFeatures.map((feature) => <li className="border-l-2 border-amber-500 pl-3" key={feature}>{feature}</li>)}
        </ul>
      </section>

      <aside className="mt-6 rounded-sm bg-slate-100 p-5 text-sm text-slate-700" aria-label="Product data source">
        {product.source.type === "fictional" ? (
          <p>Fictional product created for this prototype. It is not affiliated with a manufacturer.</p>
        ) : (
          <p>Product information is based on a <a className="font-semibold underline" href={product.source.url}>public source</a>.</p>
        )}
      </aside>
    </article>
  );
}
