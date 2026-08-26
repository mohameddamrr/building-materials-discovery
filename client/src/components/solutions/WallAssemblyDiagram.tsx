import { useId } from "react";
import type { ResolvedConstructionLayer } from "../../types/scenario";

interface WallAssemblyDiagramProps {
  layers: ResolvedConstructionLayer[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function visualKind(id: string) {
  if (id.includes("insulation")) return "insulation";
  if (id.includes("frame")) return "frame";
  if (id.includes("finish")) return "finish";
  return "board";
}

export function WallAssemblyDiagram({ layers, selectedId, onSelect }: WallAssemblyDiagramProps) {
  const order = layers.map((layer) => layer.name).join(", ");
  const selectedLayer = layers.find((layer) => layer.id === selectedId);
  const idPrefix = useId().replaceAll(":", "");
  const descriptionId = `${idPrefix}-description`;
  const patternId = `${idPrefix}-insulation-pattern`;

  return (
    <figure className="border border-slate-600 bg-slate-50 p-3 sm:p-4">
      <svg aria-describedby={descriptionId} aria-label="Simplified interior-wall system-part overview" className="h-auto w-full" preserveAspectRatio="xMidYMid meet" role="img" viewBox="0 0 720 360">
        <desc id={descriptionId}>A conceptual, not-to-scale exploded overview. The parts are shown in this order: {order}. Currently selected: {selectedLayer?.name ?? "none"}.</desc>
        <defs><pattern height="16" id={patternId} patternUnits="userSpaceOnUse" width="16"><path d="M0 8Q4 0 8 8T16 8" fill="none" stroke="#a16207" strokeWidth="2" /></pattern></defs>
        <rect fill="#f8fafc" height="360" width="720" />
        <text fill="#475569" fontSize="18" fontWeight="700" x="28" y="38">Room side</text>
        <text fill="#475569" fontSize="18" fontWeight="700" textAnchor="end" x="692" y="38">Adjoining space</text>
        <path d="M28 52H692" stroke="#94a3b8" strokeDasharray="6 7" strokeWidth="2" />
        {layers.map((layer, index) => {
          const selected = layer.id === selectedId;
          const kind = visualKind(layer.id);
          const width = 540 / Math.max(layers.length, 1);
          const x = 90 + index * width;
          const center = x + (width - 10) / 2;
          return (
            <g data-layer-id={layer.id} data-selected={selected ? "true" : "false"} key={layer.id}>
              <rect fill={selected ? "#fffbeb" : "#ffffff"} height="220" rx="8" stroke={selected ? "#b45309" : "#cbd5e1"} strokeWidth={selected ? "5" : "2"} width={width - 10} x={x} y="72" />
              {kind === "board" && <rect fill="#e7e5e4" height="150" stroke="#57534e" strokeWidth="3" width="34" x={center - 17} y="105" />}
              {kind === "insulation" && <rect fill={`url(#${patternId})`} height="142" rx="18" stroke="#a16207" strokeWidth="3" width="62" x={center - 31} y="109" />}
              {kind === "frame" && <g fill="#cbd5e1" stroke="#475569" strokeWidth="2"><rect height="16" width="76" x={center - 38} y="108" /><rect height="16" width="76" x={center - 38} y="238" /><rect height="130" width="14" x={center - 30} y="116" /><rect height="130" width="14" x={center + 16} y="116" /></g>}
              {kind === "finish" && <g><rect fill="#d6d3d1" height="150" stroke="#78716c" strokeWidth="2" width="38" x={center - 19} y="105" /><rect fill="#fef3c7" height="150" stroke="#b45309" strokeWidth="3" width="8" x={center - 4} y="105" /></g>}
              <circle cx={center} cy="318" fill={selected ? "#0f172a" : "#64748b"} r="22" />
              <text fill="white" fontSize="17" fontWeight="700" textAnchor="middle" x={center} y="324">{index + 1}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-sm leading-6 text-slate-600">Room side to adjoining space. Conceptual and not to scale.</figcaption>
      <ol aria-label="Wall parts" className="mt-4 grid gap-2 sm:grid-cols-4">
        {layers.map((layer, index) => {
          const selected = layer.id === selectedId;
          return <li key={layer.id}><button aria-controls="selected-wall-part" aria-pressed={selected} className={`min-h-20 w-full border-2 px-2 py-3 text-center transition motion-safe:hover:-translate-y-0.5 ${selected ? "border-amber-600 bg-amber-50" : "border-slate-200 bg-white hover:border-slate-400"}`} onClick={() => onSelect(layer.id)} type="button"><span className={`mx-auto flex size-8 items-center justify-center rounded-full text-sm font-bold ${selected ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-700"}`}>{index + 1}</span><span className={`mt-2 block text-xs font-bold uppercase tracking-wide ${selected ? "text-amber-700" : "text-slate-500"}`}>Part {index + 1}</span><span className="mt-1 block text-sm font-bold leading-5 text-slate-950">{layer.name}</span></button></li>;
        })}
      </ol>
    </figure>
  );
}
