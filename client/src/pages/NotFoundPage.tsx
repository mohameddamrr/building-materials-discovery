import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">The page may have moved or the address may be incorrect.</p>
      <Link className="mt-8 inline-flex rounded-sm bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800" to="/">
        Return home
      </Link>
    </section>
  );
}

