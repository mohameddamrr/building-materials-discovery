import { useEffect, useRef } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

const navigationItems = [
  { to: "/", label: "Home", end: true },
  { to: "/discover", label: "Find a solution", end: false },
  { to: "/products", label: "Products", end: false },
];

export function AppLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    document.title = getPageTitle(location.pathname);

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (location.hash === "#about") {
        const aboutSection = document.getElementById("about");
        aboutSection?.setAttribute("tabindex", "-1");
        aboutSection?.focus();
        aboutSection?.scrollIntoView();
        return;
      }

      mainRef.current?.focus();
      window.scrollTo({ top: 0 });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f1eb] text-slate-950">
      <a
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-sm bg-slate-950 px-4 py-2 text-sm font-semibold text-white motion-safe:transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101820] text-white shadow-lg shadow-slate-950/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <NavLink className="group flex items-center gap-3" to="/">
            <span className="flex size-9 items-center justify-center bg-amber-400 text-sm font-black text-[#101820] motion-safe:transition-transform motion-safe:group-hover:rotate-6">MP</span>
            <span className="text-lg font-bold tracking-tight">Material Pathways</span>
          </NavLink>
          <nav aria-label="Primary navigation" className="max-w-full overflow-x-auto">
            <ul className="flex w-max gap-1 whitespace-nowrap">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    className={({ isActive }) =>
                      `inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-amber-400 text-[#101820]"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                    end={item.end}
                    to={item.to}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li><Link className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white" to="/#about">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 sm:py-14" id="main-content" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-[#101820] text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-5 py-8 text-sm sm:px-8">
          <span>Material Pathways</span><span>A focused prototype for exploring better building systems.</span>
        </div>
      </footer>
    </div>
  );
}

function getPageTitle(pathname: string) {
  if (pathname === "/") return "Material Pathways | Building-material discovery";
  if (pathname === "/discover") return "Find a solution | Material Pathways";
  if (pathname === "/products") return "Products | Material Pathways";
  if (pathname.startsWith("/products/")) return "Product details | Material Pathways";
  if (pathname.startsWith("/solutions/")) return "Solution guide | Material Pathways";
  return "Page not found | Material Pathways";
}
