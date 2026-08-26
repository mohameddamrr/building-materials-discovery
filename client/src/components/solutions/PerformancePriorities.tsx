export function PerformancePriorities({ priorities }: { priorities: string[] }) {
  return (
    <section aria-labelledby="priorities-heading" className="mt-12 rounded-sm bg-stone-100 p-6 sm:p-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-950" id="priorities-heading">What matters for this need</h2>
      <p className="mt-3 max-w-3xl text-slate-600">These are simplified educational priorities, not project requirements or certified performance claims.</p>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {priorities.map((priority, index) => (
          <li className="rounded-sm border border-slate-200 bg-white p-5" key={priority}>
            <span className="text-sm font-bold text-amber-700">Priority {index + 1}</span>
            <p className="mt-2 font-semibold leading-6 text-slate-900">{priority}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

