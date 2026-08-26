export function PerformancePriorities({ priorities }: { priorities: string[] }) {
  return (
    <section aria-labelledby="priorities-heading" className="scroll-mt-6 mt-10 overflow-hidden rounded-[2rem] bg-[#101820] px-6 py-10 text-white sm:px-10 sm:py-12" id="priorities">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">What matters here</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" id="priorities-heading">What this wall concept is trying to achieve</h2><p className="mt-4 leading-7 text-slate-300">These are simplified educational priorities, not certified performance claims.</p></div><ul className="grid gap-3">{priorities.map((priority, index) => <li className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/60 hover:bg-white/10" key={priority}><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-400 font-black text-slate-950">{String(index + 1).padStart(2, "0")}</span><p className="font-bold leading-6 text-white">{priority}</p></li>)}</ul></div>
    </section>
  );
}
