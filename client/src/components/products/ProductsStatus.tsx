interface ProductsStatusProps {
  status: "loading" | "success" | "error";
  total: number;
  onRetry: () => void;
  onClear: () => void;
}

export function ProductsStatus({ status, total, onRetry, onClear }: ProductsStatusProps) {
  if (status === "loading") {
    return <p className="rounded-sm border border-slate-200 bg-white p-5 text-slate-600" role="status">Loading products…</p>;
  }

  if (status === "error") {
    return (
      <div className="rounded-sm border border-red-200 bg-red-50 p-5" role="alert">
        <h2 className="font-bold text-red-950">We couldn’t load the products.</h2>
        <p className="mt-1 text-red-900">Check the connection and try again.</p>
        <button className="mt-4 rounded-sm bg-slate-950 px-4 py-2 font-semibold text-white hover:bg-slate-800" onClick={onRetry} type="button">Try again</button>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="rounded-sm border border-slate-200 bg-white p-6 text-center">
        <h2 className="text-xl font-bold text-slate-950">No products match your search and filters.</h2>
        <p className="mt-2 text-slate-600">Try a broader search or clear the current filters.</p>
        <button className="mt-5 rounded-sm bg-slate-950 px-4 py-2 font-semibold text-white hover:bg-slate-800" onClick={onClear} type="button">Clear search and filters</button>
      </div>
    );
  }

  return <p aria-atomic="true" aria-live="polite" className="text-sm font-semibold text-slate-700">{total} {total === 1 ? "product" : "products"}</p>;
}

