import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useScenarioChoices } from "../hooks/useScenarioChoices";
import { ApiError } from "../services/productsApi";
import { getRecommendation } from "../services/scenariosApi";
import type { Room, UserNeed } from "../types/scenario";
import { roomDescriptions, roomLabels, userNeedLabels } from "../utils/scenarioLabels";

export function DiscoverPage() {
  const navigate = useNavigate();
  const { scenarios, status, retry } = useScenarioChoices();
  const [room, setRoom] = useState<Room | null>(null);
  const [need, setNeed] = useState<UserNeed | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "unsupported" | "error">("idle");
  const availableRooms = [...new Set(scenarios.map((scenario) => scenario.room))];
  const availableNeeds = room ? scenarios.filter((scenario) => scenario.room === room).map((scenario) => scenario.need) : [];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!room || !need) return;
    setSubmitStatus("loading");
    try {
      const scenario = await getRecommendation(room, need);
      navigate(`/solutions/${scenario.slug}`);
    } catch (error) {
      setSubmitStatus(error instanceof ApiError && error.status === 404 ? "unsupported" : "error");
    }
  }

  if (status === "loading") return <p role="status" className="rounded-sm border border-slate-200 bg-white p-5">Loading guided choices…</p>;
  if (status === "error") return (
    <section role="alert" className="rounded-sm border border-red-200 bg-red-50 p-6">
      <h1 className="text-2xl font-bold text-red-950">We couldn’t load the guided choices.</h1>
      <div className="mt-5 flex gap-4"><button type="button" onClick={retry} className="rounded-sm bg-slate-950 px-4 py-2 font-semibold text-white">Try again</button><Link to="/products" className="py-2 font-semibold underline">Browse products</Link></div>
    </section>
  );

  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Guided discovery</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">What would you like to improve?</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Start with a familiar space and need. This prototype focuses on interior walls, so there is no unnecessary building-element step.</p>

      <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-xl font-bold text-slate-950">Which space are you working on?</legend>
          <p className="mt-2 text-slate-600">This first prototype supports one curated interior-wall example for each space.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {availableRooms.map((value) => (
              <label className={`cursor-pointer rounded-sm border p-5 ${room === value ? "border-amber-500 bg-amber-50" : "border-slate-200 bg-white"}`} key={value}>
                <input className="mr-3 accent-amber-600" checked={room === value} name="room" onChange={() => { setRoom(value); setNeed(null); setSubmitStatus("idle"); }} type="radio" value={value} />
                <span className="font-bold text-slate-950">{roomLabels[value]}</span>
                <span className="mt-2 block pl-7 text-sm text-slate-600">{roomDescriptions[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {room && (
          <fieldset>
            <legend className="text-xl font-bold text-slate-950">What would you like to improve?</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {availableNeeds.map((value) => (
                <label className={`cursor-pointer rounded-sm border p-5 ${need === value ? "border-amber-500 bg-amber-50" : "border-slate-200 bg-white"}`} key={value}>
                  <input className="mr-3 accent-amber-600" checked={need === value} name="need" onChange={() => { setNeed(value); setSubmitStatus("idle"); }} type="radio" value={value} />
                  <span className="font-bold text-slate-950">{userNeedLabels[value]}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {submitStatus === "unsupported" && <p role="alert" className="rounded-sm border border-amber-200 bg-amber-50 p-4 text-amber-950">That combination isn’t included in this prototype yet. Choose another option.</p>}
        {submitStatus === "error" && <p role="alert" className="rounded-sm border border-red-200 bg-red-50 p-4 text-red-950">We couldn’t find your solution. Check the connection and try again.</p>}

        <button className="rounded-sm bg-slate-950 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400" disabled={!room || !need || submitStatus === "loading"} type="submit">
          {submitStatus === "loading" ? "Finding your solution…" : "Show my wall solution"}
        </button>
      </form>
    </section>
  );
}
