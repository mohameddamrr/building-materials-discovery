import { useSearchParams } from "react-router";
import { ProductFilters } from "../components/products/ProductFilters";
import { ProductGrid } from "../components/products/ProductGrid";
import { ProductsStatus } from "../components/products/ProductsStatus";
import { useProducts } from "../hooks/useProducts";
import {
  performanceNeeds,
  productCategories,
  type PerformanceNeed,
  type ProductCategory,
  type ProductQuery,
} from "../types/product";

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedState = parseSearchParams(searchParams);
  const query = parsedState.query;
  const { products, total, status, retry } = useProducts(query);

  function updateQuery(updates: Partial<ProductQuery>) {
    const nextQuery = { ...query, ...updates };
    const nextParams = new URLSearchParams();
    const trimmedSearch = nextQuery.q?.trim();

    if (trimmedSearch) nextParams.set("q", trimmedSearch);
    if (nextQuery.category) nextParams.set("category", nextQuery.category);
    if (nextQuery.need) nextParams.set("need", nextQuery.need);
    setSearchParams(nextParams);
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams());
  }

  return (
    <section aria-labelledby="products-heading">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#101820] px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="absolute -right-16 -top-24 size-72 rounded-full bg-amber-400/20 blur-3xl" />
        <p className="relative text-sm font-bold uppercase tracking-[0.22em] text-amber-300">The material library</p>
        <h1 className="relative mt-4 text-5xl font-bold tracking-tight sm:text-6xl" id="products-heading">Products that make spaces work.</h1>
        <p className="relative mt-5 max-w-2xl text-lg leading-8 text-slate-200">A focused catalogue of boards, insulation, framing and finishing materials. Search by what you need to achieve.</p>
      </div>

      <div className="relative z-10 -mt-5 px-2 sm:px-5">
        <ProductFilters
          category={query.category}
          hasActiveFilters={searchParams.size > 0}
          initialSearchValue={query.q ?? ""}
          key={query.q ?? ""}
          need={query.need}
          onCategoryChange={(category) => updateQuery({ category })}
          onClear={clearFilters}
          onNeedChange={(need) => updateQuery({ need })}
          onSearchSubmit={(q) => updateQuery({ q })}
        />
      </div>

      {parsedState.hasInvalidParameters && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-sm border border-amber-200 bg-amber-50 p-4" role="status">
          <p className="text-sm text-amber-950">Some filters in this link were not supported and were ignored.</p>
          <button className="text-sm font-semibold text-amber-950 underline underline-offset-4" onClick={() => updateQuery({})} type="button">Use valid filters</button>
        </div>
      )}

      <div aria-labelledby="results-heading" className="mt-8">
        <h2 className="sr-only" id="results-heading">Product results</h2>
        <ProductsStatus onClear={clearFilters} onRetry={retry} status={status} total={total} />
        {status === "success" && total > 0 && <div className="mt-4"><ProductGrid products={products} /></div>}
      </div>
    </section>
  );
}

function parseSearchParams(searchParams: URLSearchParams): { query: ProductQuery; hasInvalidParameters: boolean } {
  const knownKeys = new Set(["q", "category", "need"]);
  const hasUnknownKeys = [...searchParams.keys()].some((key) => !knownKeys.has(key));
  const hasRepeatedValues = [...knownKeys].some((key) => searchParams.getAll(key).length > 1);
  const q = searchParams.get("q")?.trim() || undefined;
  const categoryValue = searchParams.get("category");
  const needValue = searchParams.get("need");
  const category = productCategories.find((value) => value === categoryValue) as ProductCategory | undefined;
  const need = performanceNeeds.find((value) => value === needValue) as PerformanceNeed | undefined;
  const hasInvalidEnums = (categoryValue !== null && !category) || (needValue !== null && !need);

  return {
    query: { ...(q ? { q } : {}), ...(category ? { category } : {}), ...(need ? { need } : {}) },
    hasInvalidParameters: hasUnknownKeys || hasRepeatedValues || hasInvalidEnums,
  };
}
