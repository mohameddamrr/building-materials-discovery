import { Link, useParams } from "react-router";
import { PerformancePriorities } from "../components/solutions/PerformancePriorities";
import { RecommendationList } from "../components/solutions/RecommendationList";
import { roomPhotos } from "../components/solutions/solutionVisuals";
import { WallLayerExplorer } from "../components/solutions/WallLayerExplorer";
import { useScenario } from "../hooks/useScenario";
import { buildingElementLabels, roomLabels, userNeedLabels } from "../utils/scenarioLabels";

export function SolutionPage() {
  const { scenarioSlug = "" } = useParams();
  const { scenario, status, retry } = useScenario(scenarioSlug);

  if (status === "loading") return <p role="status" className="rounded-2xl bg-white p-5 shadow-sm">Loading solution...</p>;
  if (status === "not-found") return <section><h1 className="text-4xl font-bold text-slate-950">Solution not found</h1><p className="mt-4 text-lg text-slate-600">This link may be invalid or the scenario is not supported.</p><div className="mt-6 flex gap-4"><Link className="font-semibold underline" to="/discover">Change my choices</Link><Link className="font-semibold underline" to="/products">Browse products</Link></div></section>;
  if (status === "error" || !scenario) return <section role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6"><h1 className="text-2xl font-bold text-red-950">We could not load this solution.</h1><p className="mt-2 text-red-900">Check the connection and try again.</p><div className="mt-5 flex gap-4"><button className="rounded-full bg-slate-950 px-5 py-2.5 font-semibold text-white" onClick={retry} type="button">Try again</button><Link className="py-2 font-semibold underline" to="/discover">Change my choices</Link></div></section>;

  const roomPhoto = roomPhotos[scenario.room];
  return (
    <article>
      <header className="relative min-h-[540px] overflow-hidden rounded-[2rem] bg-slate-950 text-white sm:min-h-[620px]">
        <img alt={roomPhoto.alt} className="absolute inset-0 size-full object-cover opacity-70" height="720" src={roomPhoto.src} width="1280" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/80 to-[#101820]/15" />
        <div className="relative flex min-h-[540px] max-w-3xl flex-col justify-end p-6 sm:min-h-[620px] sm:p-10 lg:p-14">
          <Link className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20" to="/discover">← Change project choices</Link>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="Selected context"><span className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-slate-950">{roomLabels[scenario.room]}</span><span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">{userNeedLabels[scenario.need]}</span><span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">{buildingElementLabels[scenario.element]}</span></div>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.22em] text-amber-300">Your project concept</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{scenario.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">{scenario.summary}</p>
          <p className="mt-8 text-xs text-slate-300">Context photo: <a className="underline underline-offset-2" href={roomPhoto.href} rel="noreferrer" target="_blank">{roomPhoto.credit} ↗</a></p>
        </div>
      </header>

      <nav aria-label="Solution guide" className="mt-5 flex flex-wrap gap-2"><a className="rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-amber-50" href="#wall-system">Wall layers</a><a className="rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-amber-50" href="#priorities">What matters</a><a className="rounded-full bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-amber-50" href="#products-to-explore">Recommended materials</a></nav>

      <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Solution summary">
        <div className="rounded-2xl bg-amber-400 p-5 text-slate-950"><p className="text-xs font-black uppercase tracking-[0.18em]">Focus</p><p className="mt-3 text-lg font-bold">A clearer wall-system response</p></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">System</p><p className="mt-3 text-lg font-bold text-slate-950">{scenario.layers.length} material layers</p></div>
        <div className="rounded-2xl bg-[#101820] p-5 text-white"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Explore</p><p className="mt-3 text-lg font-bold">{scenario.recommendations.length} relevant products</p></div>
      </section>

      <WallLayerExplorer key={scenario.slug} layers={scenario.layers} />
      <PerformancePriorities priorities={scenario.performancePriorities} />
      <RecommendationList recommendations={scenario.recommendations} />
      <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#101820] px-6 py-7 text-white"><p className="font-semibold">Want to explore a different project?</p><div className="flex flex-wrap gap-4"><Link className="font-bold text-amber-300 underline underline-offset-4" to="/discover">Change choices</Link><Link className="font-bold text-amber-300 underline underline-offset-4" to="/products">Browse all products</Link></div></footer>
    </article>
  );
}
