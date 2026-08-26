interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Foundation route</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">{title}</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">{description}</p>
    </section>
  );
}

