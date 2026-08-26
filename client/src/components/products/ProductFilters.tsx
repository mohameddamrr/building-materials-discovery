import { useState, type FormEvent } from "react";
import { performanceNeeds, productCategories, type PerformanceNeed, type ProductCategory } from "../../types/product";
import { categoryLabels, performanceNeedLabels } from "../../utils/productLabels";

interface ProductFiltersProps {
  initialSearchValue: string;
  category?: ProductCategory;
  need?: PerformanceNeed;
  hasActiveFilters: boolean;
  onSearchSubmit: (value: string) => void;
  onCategoryChange: (value?: ProductCategory) => void;
  onNeedChange: (value?: PerformanceNeed) => void;
  onClear: () => void;
}

export function ProductFilters({
  initialSearchValue,
  category,
  need,
  hasActiveFilters,
  onSearchSubmit,
  onCategoryChange,
  onNeedChange,
  onClear,
}: ProductFiltersProps) {
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchSubmit(searchValue);
  }

  return (
    <form aria-label="Search and filter products" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5" onSubmit={handleSubmit} role="search">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_1fr_1fr_auto] lg:items-end">
        <div>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="product-search">
            Search products
          </label>
          <div className="mt-2 flex gap-2">
            <input
              autoComplete="off"
              className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 placeholder:text-slate-500"
              id="product-search"
              name="q"
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Try sound, bathroom, or insulation"
              type="search"
              value={searchValue}
            />
            <button className="min-h-11 rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950 hover:bg-amber-300" type="submit">
              Search
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="product-category">
            Category
          </label>
          <select
            className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950"
            id="product-category"
            onChange={(event) => onCategoryChange(event.target.value ? (event.target.value as ProductCategory) : undefined)}
            value={category ?? ""}
          >
            <option value="">All categories</option>
            {productCategories.map((value) => (
              <option key={value} value={value}>{categoryLabels[value]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800" htmlFor="product-need">
            Performance need
          </label>
          <select
            className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950"
            id="product-need"
            onChange={(event) => onNeedChange(event.target.value ? (event.target.value as PerformanceNeed) : undefined)}
            value={need ?? ""}
          >
            <option value="">All performance needs</option>
            {performanceNeeds.map((value) => (
              <option key={value} value={value}>{performanceNeedLabels[value]}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button className="min-h-11 rounded-sm border border-slate-300 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-100" onClick={onClear} type="button">
            Clear filters
          </button>
        )}
      </div>
    </form>
  );
}
