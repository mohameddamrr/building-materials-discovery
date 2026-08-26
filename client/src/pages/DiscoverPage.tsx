import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useScenarioChoices } from "../hooks/useScenarioChoices";
import { ApiError } from "../services/productsApi";
import { getRecommendation } from "../services/scenariosApi";
import type { Room, UserNeed } from "../types/scenario";
import { roomDescriptions, roomLabels, userNeedLabels } from "../utils/scenarioLabels";

type DiscoveryElement = "wall" | "roof" | "ceiling" | "floor";
type DiscoveryPosition = "interior" | "exterior";

const elementChoices: Array<{ id: DiscoveryElement; label: string; description: string; available: boolean; image: string; alt: string }> = [
  { id: "wall", label: "Walls", description: "Partitions and wall build-ups", available: true, image: "/images/generated/wall-system-v2.jpg", alt: "Modern interior wall construction with metal studs and insulation" },
  { id: "roof", label: "Roof", description: "Roof layers and weather protection", available: false, image: "/images/generated/roof-choice-v2.jpg", alt: "Modern timber roof build-up with insulation and weather layers" },
  { id: "ceiling", label: "Ceiling", description: "Ceiling build-ups and comfort", available: false, image: "/images/generated/ceiling-choice-v2.jpg", alt: "Suspended ceiling grid with partially installed boards" },
  { id: "floor", label: "Floor", description: "Floor layers and underlays", available: false, image: "/images/generated/floor-choice-v2.jpg", alt: "Modern layered floor build-up with timber finish" },
];

const roomImages: Record<Room, { src: string; width: number }> = {
  bathroom: { src: "/images/generated/bathroom-room-v2.jpg", width: 1672 },
  bedroom: { src: "/images/generated/bedroom-room-v2.jpg", width: 1672 },
};

const problemImages: Record<UserNeed, { src: string; width: number; height: number }> = {
  "reduce-noise": { src: "/images/generated/noise-goal-v2.jpg", width: 1672, height: 940 },
  "improve-thermal-comfort": { src: "/images/generated/thermal-goal-v2.jpg", width: 1672, height: 940 },
  "manage-moisture": { src: "/images/generated/moisture-goal-v2.jpg", width: 1672, height: 940 },
};

export function DiscoverPage() {
  const navigate = useNavigate();
  const { scenarios, status, retry } = useScenarioChoices();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [element, setElement] = useState<DiscoveryElement | null>(null);
  const [position, setPosition] = useState<DiscoveryPosition | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [need, setNeed] = useState<UserNeed | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "unsupported" | "error">("idle");
  const requestController = useRef<AbortController | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  const availableRooms = [...new Set(scenarios.map((scenario) => scenario.room))];
  const availableScenarios = room ? scenarios.filter((scenario) => scenario.room === room) : [];
  const selectedScenario = availableScenarios.find((scenario) => scenario.need === need);

  useEffect(() => () => requestController.current?.abort(), []);

  useEffect(() => {
    if (previousStep.current !== step) {
      stepHeadingRef.current?.focus();
      previousStep.current = step;
    }
  }, [step]);

  function selectRoom(value: Room) {
    if (submitStatus === "loading") return;
    setRoom(value);
    setNeed(null);
    setSubmitStatus("idle");
    setStep(4);
  }

  function selectElement(value: DiscoveryElement) {
    if (submitStatus === "loading") return;
    setElement(value);
    setPosition(null);
    setRoom(null);
    setNeed(null);
    setSubmitStatus("idle");
    setStep(2);
  }

  function selectPosition(value: DiscoveryPosition) {
    if (value === "exterior" || submitStatus === "loading") return;
    setPosition(value);
    setRoom(null);
    setNeed(null);
    setSubmitStatus("idle");
    setStep(3);
  }

  async function openSolution(selectedNeed: UserNeed) {
    if (element !== "wall" || position !== "interior" || !room || submitStatus === "loading") return;
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setSubmitStatus("loading");
    try {
      const recommendation = await getRecommendation(room, selectedNeed, controller.signal);
      navigate(`/solutions/${recommendation.slug}`);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setSubmitStatus(error instanceof ApiError && error.status === 404 ? "unsupported" : "error");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!need) return;
    await openSolution(need);
  }

  if (status === "loading") return <p role="status" className="rounded-sm border border-slate-200 bg-white p-5">Loading guided choices...</p>;
  if (status === "error") return (
    <section role="alert" className="rounded-sm border border-red-200 bg-red-50 p-6">
      <h1 className="text-2xl font-bold text-red-950">We couldn&apos;t load the guided choices.</h1>
      <div className="mt-5 flex gap-4"><button type="button" onClick={retry} className="rounded-sm bg-slate-950 px-4 py-2 font-semibold text-white">Try again</button><Link to="/products" className="py-2 font-semibold underline">Browse products</Link></div>
    </section>
  );
  if (scenarios.length === 0) return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" role="status">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Guided discovery</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">No guided examples are available.</h1>
      <p className="mt-3 max-w-xl leading-7 text-slate-600">The catalogue is still available while the guided examples are reloaded.</p>
      <div className="mt-6 flex flex-wrap gap-4"><button className="rounded-full bg-slate-950 px-5 py-2.5 font-semibold text-white" onClick={retry} type="button">Try again</button><Link className="py-2.5 font-semibold underline underline-offset-4" to="/products">Browse products</Link></div>
    </section>
  );

  return (
    <section>
      <div className="relative overflow-hidden rounded-[2rem] bg-[#101820] px-6 py-10 text-white sm:px-10 sm:py-12">
        <img alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-35" src="/images/generated/discovery-hero-v2.jpg" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/90 to-[#101820]/25" />
        <p className="relative text-sm font-bold uppercase tracking-[0.22em] text-amber-300">Guided discovery</p>
        <h1 className="relative mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Build your project path</h1>
        <p className="relative mt-4 max-w-2xl text-lg leading-8 text-slate-200">Choose your building element, then tell us what matters in the space. We’ll turn it into a clear material system.</p>
      </div>

      <form aria-busy={submitStatus === "loading"} className="mt-10" onSubmit={handleSubmit}>
        <ol className="mb-8 grid gap-3 rounded-2xl bg-white p-3 shadow-sm sm:grid-cols-4" aria-label="Discovery progress">
          {[{ item: 1, label: "Element" }, { item: 2, label: "Location" }, { item: 3, label: "Space" }, { item: 4, label: "Goal" }].map(({ item, label }) => <li aria-current={item === step ? "step" : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold ${item === step ? "bg-amber-400 text-slate-950" : item < step ? "bg-slate-100 text-slate-700" : "text-slate-400"}`} key={item}><span className={`flex size-7 items-center justify-center rounded-full text-xs ${item === step ? "bg-slate-950 text-white" : "bg-slate-200 text-slate-600"}`}>{item}</span>{label}</li>)}
        </ol>
        {step === 1 && <section aria-labelledby="element-choice-heading">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Your project</p><h2 className="mt-2 text-3xl font-bold text-slate-950" id="element-choice-heading" ref={stepHeadingRef} tabIndex={-1}>What are you working on?</h2></div><p className="max-w-xs text-sm leading-6 text-slate-600">Choose an available element to begin.</p></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2" role="group" aria-labelledby="element-choice-heading">
            {elementChoices.map((choice) => {
              const selected = element === choice.id;
              return (
                <button aria-pressed={selected} className={`group relative min-h-72 overflow-hidden rounded-2xl border-2 text-left text-white shadow-lg outline-offset-4 motion-safe:transition-transform motion-safe:hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-amber-500 ${selected ? "border-amber-400" : "border-transparent hover:border-amber-300"}`} disabled={!choice.available || submitStatus === "loading"} key={choice.id} onClick={() => selectElement(choice.id)} type="button">
                  <img alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105" height="520" src={choice.image} width="780" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/10" />
                  <span className="absolute inset-x-0 bottom-0 block p-5"><span className="block text-2xl font-bold">{choice.label}</span><span className="mt-1 block text-sm leading-6 text-slate-200">{choice.description}</span></span>
                  <span className="absolute inset-x-0 top-0 flex justify-end p-4"><span className={`px-2 py-1 text-xs font-bold uppercase tracking-wide ${choice.available ? (selected ? "bg-amber-500 text-slate-950" : "bg-white/90 text-slate-950") : "bg-slate-950/75 text-white"}`}>{choice.available ? (selected ? "Selected" : "Available") : "Coming soon"}</span></span>
                </button>
              );
            })}
          </div>
        </section>}

        {element === "wall" && step === 2 && (
        <section aria-labelledby="position-choice-heading" className="mt-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Wall type</p><h2 className="mt-2 text-3xl font-bold text-slate-950" id="position-choice-heading" ref={stepHeadingRef} tabIndex={-1}>Where is the wall?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2" role="group" aria-labelledby="position-choice-heading">
              {([{ id: "interior", label: "Interior", description: "A wall between rooms or spaces", available: true, image: "/images/generated/interior-wall-choice-v2.jpg" }, { id: "exterior", label: "Exterior", description: "A wall exposed to outdoor conditions", available: false, image: "/images/generated/exterior-wall-choice-v2.jpg" }] as const).map((choice) => {
                const selected = position === choice.id;
                return <button aria-pressed={selected} className={`group relative min-h-60 overflow-hidden rounded-2xl border-2 text-left text-white shadow-lg outline-offset-4 motion-safe:transition-transform motion-safe:hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-amber-500 ${selected ? "border-amber-400" : "border-transparent hover:border-amber-300"}`} disabled={!choice.available || submitStatus === "loading"} key={choice.id} onClick={() => selectPosition(choice.id)} type="button"><img alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-105" src={choice.image} /><span className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/10" /><span className="absolute inset-x-0 bottom-0 p-5"><span className="block text-2xl font-bold">{choice.label}</span><span className="mt-1 block text-sm leading-6 text-slate-200">{choice.description}</span></span><span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${choice.available ? (selected ? "bg-amber-400 text-slate-950" : "bg-white text-slate-950") : "bg-slate-950/80 text-white"}`}>{choice.available ? (selected ? "Selected" : "Available") : "Coming soon"}</span></button>;
              })}
            </div>
            <button className="mt-6 font-semibold text-slate-600 underline underline-offset-4 disabled:cursor-not-allowed disabled:text-slate-400" disabled={submitStatus === "loading"} onClick={() => setStep(1)} type="button">← Back to building elements</button>
          </section>
        )}

        {position === "interior" && step === 3 && (
        <section aria-labelledby="room-choice-heading" className="mt-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Your space</p><h2 className="mt-2 text-3xl font-bold text-slate-950" id="room-choice-heading" ref={stepHeadingRef} tabIndex={-1}>Which space is it?</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2" role="group" aria-labelledby="room-choice-heading">
            {availableRooms.map((value) => {
              const selected = room === value;
              const image = roomImages[value];
              const count = scenarios.filter((scenario) => scenario.room === value).length;
              return (
                <button aria-pressed={selected} className={`group relative min-h-80 overflow-hidden rounded-sm border-4 bg-slate-950 text-left text-white shadow-sm outline-offset-4 motion-safe:transition-transform motion-safe:hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-amber-500 ${selected ? "border-amber-500" : "border-transparent hover:border-amber-300"}`} disabled={submitStatus === "loading"} key={value} onClick={() => selectRoom(value)} type="button">
                  <img alt="" className="absolute inset-0 size-full object-cover opacity-75 motion-safe:transition-transform motion-safe:group-hover:scale-[1.03]" height="750" src={image.src} width={image.width} />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 block p-6">
                    <span className="flex items-center justify-between gap-3"><span className="text-2xl font-bold">{roomLabels[value]}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${selected ? "bg-amber-500 text-slate-950" : "bg-white/90 text-slate-950"}`}>{selected ? "Selected" : `${count} ${count === 1 ? "problem" : "problems"}`}</span></span>
                    <span className="mt-2 block text-sm leading-6 text-slate-200">{roomDescriptions[value]}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <button className="mt-6 font-semibold text-slate-600 underline underline-offset-4 disabled:cursor-not-allowed disabled:text-slate-400" disabled={submitStatus === "loading"} onClick={() => setStep(2)} type="button">← Back to wall position</button>
        </section>
        )}

        <p aria-live="polite" className="sr-only">{!element ? "Choose a building element to begin." : !position ? "Choose whether the wall is interior or exterior." : room ? `${roomLabels[room]} selected. ${availableScenarios.length} ${availableScenarios.length === 1 ? "problem" : "problems"} available.` : "Choose a room to see available problems."}</p>

        {position === "interior" && room && step === 4 && (
          <section aria-labelledby="problem-choice-heading" className="mt-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700">Your goal</p><h2 aria-label="4. What would you like to improve?" className="mt-2 text-3xl font-bold text-slate-950" id="problem-choice-heading" ref={stepHeadingRef} tabIndex={-1}>What would you like to improve?</h2>
            <p className="mt-2 text-slate-600">Available for {roomLabels[room]}.</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2" role="group" aria-labelledby="problem-choice-heading">
              {availableScenarios.map((scenario) => {
                const selected = need === scenario.need;
                const image = problemImages[scenario.need];
                return (
                  <button aria-pressed={selected} className={`group relative min-h-72 overflow-hidden rounded-sm border-4 bg-slate-950 text-left text-white shadow-sm outline-offset-4 motion-safe:transition-transform motion-safe:hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-amber-500 ${selected ? "border-amber-500" : "border-transparent hover:border-amber-300"}`} disabled={submitStatus === "loading"} key={scenario.slug} onClick={() => { setNeed(scenario.need); void openSolution(scenario.need); }} type="button">
                    <img alt="" className="absolute inset-0 size-full object-cover opacity-65 motion-safe:transition-transform motion-safe:group-hover:scale-[1.03]" height={image.height} loading="lazy" src={image.src} width={image.width} />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 block p-6"><span className="flex items-start justify-between gap-3"><span className="text-xl font-bold">{userNeedLabels[scenario.need]}</span>{selected && <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950">Selected</span>}</span><span className="mt-3 block text-sm leading-6 text-slate-200">{scenario.summary}</span></span>
                  </button>
                );
              })}
            </div>
            <button className="mt-6 font-semibold text-slate-600 underline underline-offset-4 disabled:cursor-not-allowed disabled:text-slate-400" disabled={submitStatus === "loading"} onClick={() => setStep(3)} type="button">← Back to room selection</button>
          </section>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {step === 4 && <button aria-label={submitStatus === "loading" ? "Opening your solution..." : "Show my wall solution"} className="rounded-full bg-amber-400 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-500/20 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-slate-400" disabled={element !== "wall" || position !== "interior" || !room || !need || submitStatus === "loading"} type="submit">{submitStatus === "loading" ? "Opening your solution..." : "Show my wall solution →"}</button>}
          <Link className="font-semibold text-amber-800 underline underline-offset-4" to="/products">Browse all products instead</Link>
        </div>
        {step === 4 && (!room || !need) ? <p className="mt-3 text-sm text-slate-500">Choose a problem to continue.</p> : null}
        {submitStatus === "loading" && <p className="mt-4" role="status">Finding {selectedScenario?.title ?? "your wall example"}...</p>}
        {submitStatus === "unsupported" && <p role="alert" className="mt-4 rounded-sm border border-amber-200 bg-amber-50 p-4 text-amber-950">That example is not currently available. Try again, or choose another room and problem.</p>}
        {submitStatus === "error" && <p role="alert" className="mt-4 rounded-sm border border-red-200 bg-red-50 p-4 text-red-950">We couldn&apos;t open that solution. Your choices are preserved, so you can try again.</p>}
      </form>

      <p className="mt-12 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">This prototype currently guides interior-wall scenarios. More building elements are shown to communicate where the experience can grow.</p>
    </section>
  );
}
