import { Link } from "react-router";

export function HomePage() {
  return (
    <section aria-labelledby="home-heading" className="-mx-5 -mt-10 sm:-mx-8 sm:-mt-14">
      <div className="relative min-h-[620px] overflow-hidden bg-[#101820] text-white">
        <img alt="Modern interior with a calm material palette and a finished wall" className="absolute inset-0 size-full object-cover opacity-60" src="/images/materials/bedroom-context.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/75 to-[#101820]/10" />
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">Building materials, made understandable</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl" id="home-heading">Find the right material for the space you are building.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">Start with a real-world need, understand the system behind it, then explore the products that bring it together.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-[#101820] transition-transform hover:-translate-y-0.5 hover:bg-amber-300" to="/discover">Find a solution <span aria-hidden="true">→</span></Link>
              <Link className="rounded-full border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur hover:bg-white/20" to="/products">Browse products</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 sm:grid-cols-3">
        {[['01','Start with the problem','No technical vocabulary required.'],['02','See the system','Understand how each layer contributes.'],['03','Choose products','Explore a focused, curated catalogue.']].map(([number,title,copy]) => <div className="bg-[#f4f1eb] p-6 sm:p-8" key={number}><span className="text-sm font-black text-amber-700">{number}</span><h2 className="mt-3 text-lg font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div>)}
      </div>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24" id="about" aria-labelledby="about-heading">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative grid grid-cols-5 gap-3">
            <img alt="Metal wall framing prepared on a construction site" className="col-span-3 h-72 w-full rounded-3xl object-cover shadow-xl" src="/images/materials/metal-framing.jpg" />
            <img alt="Insulation material used as a representative construction layer" className="col-span-2 mt-12 h-52 w-full rounded-3xl object-cover shadow-xl" src="/images/materials/glass-wool-insulation.jpg" />
            <span className="absolute -bottom-5 left-8 rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg">Made for clearer choices</span>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-700">About Material Pathways</p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl" id="about-heading">Technical products should not require technical language to discover.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Material Pathways is a focused prototype for a building-materials company. It turns a familiar room problem into a simple wall-system story, then helps people explore the materials involved.</p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="border-t-2 border-amber-400 pt-4"><dt className="font-bold">For homeowners</dt><dd className="mt-1 text-sm leading-6 text-slate-600">Understand the role of materials before meeting construction terminology.</dd></div>
              <div className="border-t-2 border-slate-950 pt-4"><dt className="font-bold">For professionals</dt><dd className="mt-1 text-sm leading-6 text-slate-600">Go straight to search, filters and concise product information.</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="bg-[#101820] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <div><p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-300">Ready to explore?</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Find a wall solution in a few clear steps.</h2></div>
          <Link className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300" to="/discover">Start exploring <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </section>
  );
}
