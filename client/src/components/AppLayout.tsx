import { NavLink, Outlet } from "react-router";

const navigationItems = [
  { to: "/", label: "Home", end: true },
  { to: "/discover", label: "Find a solution", end: false },
  { to: "/products", label: "Products", end: false },
];

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-slate-900">
      <a
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-sm bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <NavLink className="text-lg font-bold tracking-tight text-slate-950" to="/">
            Material Pathways
          </NavLink>
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap gap-1">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    className={({ isActive }) =>
                      `inline-flex rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-amber-100 text-slate-950"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }`
                    }
                    end={item.end}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16" id="main-content">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6 text-sm text-slate-600 sm:px-8">
          A focused prototype for exploring interior-wall materials.
        </div>
      </footer>
    </div>
  );
}
