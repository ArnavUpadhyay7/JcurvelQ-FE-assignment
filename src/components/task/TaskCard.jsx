import { useState } from "react";

const STATUS_CONFIG = {
  pending:   { bar: "bg-zinc-600",     badge: "bg-zinc-800 text-zinc-400 border-zinc-700",        dot: "bg-zinc-500" },
  running:   { bar: "bg-blue-500",     badge: "bg-blue-500/10 text-blue-300 border-blue-500/25",  dot: "bg-blue-400 animate-pulse" },
  complete:  { bar: "bg-emerald-500",  badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25", dot: "bg-emerald-400" },
  failed:    { bar: "bg-red-500",      badge: "bg-red-500/10 text-red-300 border-red-500/25",     dot: "bg-red-400" },
  cancelled: { bar: "bg-zinc-700",     badge: "bg-zinc-800 text-zinc-500 border-zinc-700",        dot: "bg-zinc-600" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {status}
    </span>
  );
}

function ToolCallRow({ call, index }) {
  const [expanded, setExpanded] = useState(false);

  const inputSummary =
    typeof call.input === "string" ? call.input : JSON.stringify(call.input, null, 2);
  const outputSummary =
    typeof call.output === "string"
      ? call.output
      : call.output
      ? JSON.stringify(call.output, null, 2)
      : null;

  const statusColor = { success: "text-emerald-400", error: "text-red-400", pending: "text-zinc-500" }[call.status] ?? "text-zinc-500";

  return (
    <div className="group relative pl-4 border-l-2 border-zinc-800 hover:border-violet-500/40 transition-colors duration-200">
      <button onClick={() => setExpanded((p) => !p)} className="w-full text-left py-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[11px] font-mono font-bold text-violet-400 shrink-0 tracking-tight">
              {call.tool ?? `tool_${index}`}
            </span>
            <span className="text-[11px] text-zinc-600 truncate font-mono">
              {inputSummary.length > 55 ? inputSummary.slice(0, 55) + "…" : inputSummary}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {call.status && (
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${statusColor}`}>
                {call.status}
              </span>
            )}
            <svg
              className={`w-3 h-3 text-zinc-600 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="mt-1.5 mb-2 space-y-2">
          <div className="rounded-md bg-zinc-950 border border-zinc-800/80 p-3">
            <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 mb-1.5 font-bold">Input</p>
            <pre className="text-[11px] text-zinc-300 font-mono whitespace-pre-wrap break-all leading-relaxed">
              {inputSummary}
            </pre>
          </div>
          {outputSummary && (
            <div className="rounded-md bg-zinc-950 border border-zinc-800/80 p-3">
              <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 mb-1.5 font-bold">Output</p>
              <pre className="text-[11px] text-zinc-400 font-mono whitespace-pre-wrap break-all leading-relaxed">
                {outputSummary}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OutputRow({ output }) {
  const isFinal = output.is_final === true;
  return (
    <div className={`rounded-lg border p-3 transition-all duration-200 ${
      isFinal
        ? "bg-zinc-800/50 border-zinc-700/80"
        : "bg-zinc-900/30 border-zinc-800/40"
    }`}>
      <div className="flex items-start justify-between gap-3">
        <p className={`text-[12px] leading-relaxed flex-1 ${
          isFinal ? "text-zinc-200" : "text-zinc-500 italic"
        }`}>
          {output.content}
        </p>
        <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
          {isFinal && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              final
            </span>
          )}
          {output.quality_score != null && (
            <span className="text-[10px] font-mono text-zinc-600 tabular-nums">
              q={output.quality_score}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TaskCard({ task }) {
  const {
    label, agent, status = "pending",
    toolCalls = [], outputs = [],
    retries = 0, error, reason, message,
  } = task ?? {};

  const isFailed    = status === "failed";
  const isCancelled = status === "cancelled";
  const isRunning   = status === "running";
  const showRetry   = retries > 0 && (isRunning || isFailed);
  const cfg         = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 shadow-lg shadow-black/30 overflow-hidden">

      {/* Status bar — left edge accent */}
      <div className={`absolute inset-y-0 left-0 w-0.75 ${cfg.bar} opacity-70`} />

      {/* Running top shimmer */}
      {isRunning && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" />
      )}

      <div className="pl-5 pr-5 pt-4 pb-5 space-y-4">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <h3 className="text-[13px] font-semibold text-zinc-100 leading-snug truncate">
              {label ?? "Untitled Task"}
            </h3>
            {agent && (
              <p className="text-[11px] text-zinc-600">
                <span className="font-mono text-zinc-500">{agent}</span>
              </p>
            )}
          </div>
          <div className="shrink-0 flex items-center gap-2 pt-0.5">
            {showRetry && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                retry {retries}
              </span>
            )}
            <StatusBadge status={status} />
          </div>
        </div>

        {/* ── Tool Calls ── */}
        {toolCalls.length > 0 && (
          <section className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 font-bold mb-2">
              Tool Calls
            </p>
            <div className="space-y-2">
              {toolCalls.map((call, i) => (
                <ToolCallRow key={i} call={call} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── Outputs ── */}
        {outputs.length > 0 && (
          <section>
            <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 font-bold mb-2">
              Outputs
            </p>
            <div className="space-y-2">
              {outputs.map((out, i) => (
                <OutputRow key={i} output={out} />
              ))}
            </div>
          </section>
        )}

        {/* ── Failed ── */}
        {isFailed && (error || message) && (
          <div className="rounded-lg bg-red-950/25 border border-red-500/15 p-3">
            <p className="text-[9px] uppercase tracking-[0.15em] text-red-500/60 font-bold mb-1.5">Error</p>
            <p className="text-[11px] text-red-400 leading-relaxed font-mono">{error ?? message}</p>
          </div>
        )}

        {/* ── Cancelled ── */}
        {isCancelled && (reason || message) && (
          <div className="rounded-lg bg-zinc-800/30 border border-zinc-700/30 p-3">
            <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-600 font-bold mb-1.5">Skipped</p>
            <p className="text-[11px] text-zinc-500 leading-relaxed">{reason ?? message}</p>
          </div>
        )}

      </div>
    </div>
  );
}