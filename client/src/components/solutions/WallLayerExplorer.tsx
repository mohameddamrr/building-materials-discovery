import { useState } from "react";
import { Link } from "react-router";
import type { ResolvedConstructionLayer } from "../../types/scenario";

const layerVisualStyles = [
  "bg-stone-200",
  "bg-amber-100",
  "bg-slate-200",
  "bg-stone-300",
] as const;

export function WallLayerExplorer({ layers }: { layers: ResolvedConstructionLayer[] }) {
  const [selectedId, setSelectedId] = useState(layers[0]?.id ?? "");
  const selectedLayer = layers.find((layer) => layer.id === selectedId) ?? layers[0];

  if (!selectedLayer) return <p>No wall layers are available for this scenario.</p>;

  return (
    <section aria-labelledby="wall-layers-heading" className="mt-12">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Understand the system</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950" id="wall-layers-heading">How this wall is layered</h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-600">Select a layer to understand its role and see the products associated with it.</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">Simplified exploded wall map - conceptual and not to scale.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <ol className="grid gap-2 sm:grid-cols-4 sm:gap-1" aria-label="Wall layers in conceptual order">
          {layers.map((layer, index) => {
            const selected = layer.id === selectedLayer.id;
            return (
              <li key={layer.id}>
                <button
                  aria-pressed={selected}
                  className={`group flex min-h-28 w-full flex-col border-2 p-4 text-left transition-colors motion-reduce:transition-none sm:min-h-72 ${selected ? "relative z-10 border-amber-700 bg-amber-50" : "border-slate-300 bg-white hover:border-slate-500"}`}
                  onClick={() => setSelectedId(layer.id)}
                  type="button"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">{index + 1}</span>
                    {selected && <span className="text-xs font-bold uppercase tracking-wide text-amber-800">Selected</span>}
                  </span>
                  <span className="mt-5 block text-lg font-bold text-slate-950">{layer.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{layer.materialRole}</span>
                  <span aria-hidden="true" className={`mt-auto hidden h-12 w-full border border-slate-400 sm:block ${layerVisualStyles[index % layerVisualStyles.length]}`} />
                </button>
              </li>
            );
          })}
        </ol>

        <section aria-labelledby="selected-layer-heading" className="rounded-sm bg-slate-950 p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Selected layer</p>
          <h3 className="mt-3 text-2xl font-bold" id="selected-layer-heading">{selectedLayer.name}</h3>
          <p className="mt-3 font-semibold text-slate-200">{selectedLayer.materialRole}</p>
          <p className="mt-4 leading-7 text-slate-300">{selectedLayer.explanation}</p>
          <h4 className="mt-6 font-bold">Products associated with this layer</h4>
          {selectedLayer.products.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {selectedLayer.products.map((product) => (
                <li key={product.id}><Link className="font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200" to={`/products/${product.slug}`}>View {product.name}</Link></li>
              ))}
            </ul>
          ) : <p className="mt-3 text-slate-300">No catalogue products are associated with this layer.</p>}
        </section>
      </div>
    </section>
  );
}
