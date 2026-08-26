import { Link } from "react-router";
import { ApiStatus } from "../components/ApiStatus";

export function HomePage() {
  return (
    <section aria-labelledby="home-heading">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
        Interior walls, explained clearly
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl" id="home-heading">
        Start with your space and the problem you want to solve.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Explore products directly, or follow a guided path from a familiar need to the materials that play a role in an interior wall.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="rounded-sm bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800" to="/discover">
          Find a solution
        </Link>
        <Link className="rounded-sm border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-100" to="/products">
          Browse products
        </Link>
      </div>
      <ApiStatus />
    </section>
  );
}

