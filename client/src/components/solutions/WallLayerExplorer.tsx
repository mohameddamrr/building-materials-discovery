import { useState } from "react";
import { Link } from "react-router";
import type { ResolvedConstructionLayer } from "../../types/scenario";
import { WallAssemblyDiagram } from "./WallAssemblyDiagram";
import { layerPhotos } from "./solutionVisuals";

export function WallLayerExplorer({ layers }: { layers: ResolvedConstructionLayer[] }) {
  const [selectedId, setSelectedId] = useState(layers[0]?.id ?? "");
  const selectedLayer = layers.find((layer) => layer.id === selectedId) ?? layers[0];
  const selectedIndex = layers.findIndex((layer) => layer.id === selectedLayer?.id);
  const materialPhoto = selectedLayer ? layerPhotos[selectedLayer.id] : undefined;
  if (!selectedLayer) return <p>No wall layers are available for this scenario.</p>;

  return (
    <section aria-labelledby="wall-layers-heading" className="scroll-mt-6 mt-10 rounded-[2rem] bg-white p-6 text-slate-950 shadow-sm sm:p-10" id="wall-system">
      <div className="flex flex-wrap items-end justify-between gap-4"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Explore the system</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" id="wall-layers-heading">See how the wall works together</h2><p className="mt-3 leading-7 text-slate-600">Tap a numbered layer to see its role in the concept.</p></div><span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">Interactive wall layers</span></div>
      <p aria-live="polite" className="sr-only">Selected part {selectedIndex + 1}: {selectedLayer.name}. Details appear after the part list.</p>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]"><WallAssemblyDiagram layers={layers} onSelect={setSelectedId} selectedId={selectedLayer.id} />
        <section aria-labelledby="selected-layer-heading" className="overflow-hidden rounded-2xl bg-[#101820] text-white shadow-lg lg:sticky lg:top-24" id="selected-wall-part">
          {materialPhoto && <figure className="relative"><img alt={materialPhoto.alt} className="aspect-[16/10] max-h-64 w-full object-cover" height="400" src={materialPhoto.src} width="640" /><figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/75 px-4 py-2 text-xs leading-5 text-white"><a className="font-semibold underline underline-offset-2" href={materialPhoto.href} rel="noreferrer" target="_blank">Photo credit: {materialPhoto.credit} ↗</a></figcaption></figure>}
          <div className="p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Part {selectedIndex + 1} of {layers.length}</p><h3 className="mt-2 text-2xl font-bold" id="selected-layer-heading">{selectedLayer.name}</h3><p className="mt-3 border-l-4 border-amber-400 pl-4 font-semibold leading-6 text-slate-100">{selectedLayer.materialRole}</p><p className="mt-4 leading-7 text-slate-300">{selectedLayer.explanation}</p><h4 className="mt-5 text-sm font-bold uppercase tracking-wide text-slate-400">Products for this layer</h4>{selectedLayer.products.length > 0 ? <ul className="mt-2 space-y-2">{selectedLayer.products.map((product) => <li key={product.id}><Link className="font-bold text-white underline decoration-amber-400 decoration-2 underline-offset-4" to={`/products/${product.slug}`}>{product.name}<span aria-hidden="true"> →</span></Link></li>)}</ul> : <p className="mt-2 text-slate-300">No catalogue products are associated with this layer.</p>}</div>
        </section>
      </div>
    </section>
  );
}
