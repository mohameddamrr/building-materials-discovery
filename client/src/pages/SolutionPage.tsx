import { Link, useParams } from "react-router";
import { PerformancePriorities } from "../components/solutions/PerformancePriorities";
import { RecommendationList } from "../components/solutions/RecommendationList";
import { WallLayerExplorer } from "../components/solutions/WallLayerExplorer";
import { useScenario } from "../hooks/useScenario";
import { buildingElementLabels, roomLabels, userNeedLabels } from "../utils/scenarioLabels";

export function SolutionPage() {
  const { scenarioSlug = "" } = useParams();
  const { scenario, status, retry } = useScenario(scenarioSlug);

  if (status === "loading") return <p role="status" className="rounded-sm border border-slate-200 bg-white p-5">Loading solution...</p>;
  if (status === "not-found") return (
    <section><h1 className="text-4xl font-bold text-slate-950">Solution not found</h1><p className="mt-4 text-lg text-slate-600">This link may be invalid or the scenario is not supported.</p><div className="mt-6 flex gap-4"><Link className="font-semibold underline" to="/discover">Change my choices</Link><Link className="font-semibold underline" to="/products">Browse products</Link></div></section>
  );
  if (status === "error" || !scenario) return (
    <section role="alert" className="rounded-sm border border-red-200 bg-red-50 p-6"><h1 className="text-2xl font-bold text-red-950">We could not load this solution.</h1><p className="mt-2 text-red-900">Check the connection and try again.</p><div className="mt-5 flex gap-4"><button className="rounded-sm bg-slate-950 px-4 py-2 font-semibold text-white" onClick={retry} type="button">Try again</button><Link className="py-2 font-semibold underline" to="/discover">Change my choices</Link></div></section>
  );

  return (
    <article>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Your interior-wall starting point</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{scenario.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{scenario.summary}</p>
      <section className="mt-8 rounded-sm border border-slate-200 bg-white p-6"><h2 className="text-xl font-bold">Your choices</h2><dl className="mt-4 grid gap-4 sm:grid-cols-3"><div><dt className="text-sm font-semibold text-slate-500">Space</dt><dd className="mt-1 font-bold">{roomLabels[scenario.room]}</dd></div><div><dt className="text-sm font-semibold text-slate-500">Need</dt><dd className="mt-1 font-bold">{userNeedLabels[scenario.need]}</dd></div><div><dt className="text-sm font-semibold text-slate-500">Element</dt><dd className="mt-1 font-bold">{buildingElementLabels[scenario.element]}</dd></div></dl></section>
      <WallLayerExplorer key={scenario.slug} layers={scenario.layers} />
      <PerformancePriorities priorities={scenario.performancePriorities} />
      <RecommendationList recommendations={scenario.recommendations} />
      <aside aria-label="Recommendation limitation" className="mt-8 rounded-sm border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">Recommendations in this prototype illustrate a product-discovery experience. Final system and material selection depends on project-specific technical and regulatory requirements.</aside>
      <div className="mt-8 flex flex-wrap gap-4"><Link className="rounded-sm bg-slate-950 px-5 py-3 font-semibold text-white" to="/discover">Change my choices</Link><Link className="rounded-sm border border-slate-300 bg-white px-5 py-3 font-semibold" to="/products">Browse all products</Link></div>
    </article>
  );
}
