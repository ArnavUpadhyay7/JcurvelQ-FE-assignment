import { useState, useEffect } from "react";

const STATUS_STYLES = {
  running:  "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  complete: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  failed:   "bg-red-500/15 text-red-400 border border-red-500/30",
  idle:     "bg-zinc-700/40 text-zinc-500 border border-zinc-700/50",
};

const STATUS_DOTS = {
  running:  "bg-blue-400 animate-pulse",
  complete: "bg-emerald-400",
  failed:   "bg-red-400",
  idle:     "bg-zinc-600",
};

function useElapsed(startTime, active) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active || !startTime) return;
    const tick = () => setElapsed(Math.floor((Date.now() - new Date(startTime).getTime()) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime, active]);

  return elapsed;
}

function formatElapsed(seconds) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function RunHeader({ run = null }) {
  const status   = run?.status ?? "idle";
  const isActive = status === "running";
  const elapsed  = useElapsed(run?.startTime, isActive);

  return (
    <div className="pb-5 border-b border-zinc-800">
      <div className="flex items-start justify-between gap-6">

        {/* Left — query */}
        <div className="min-w-0 flex-1">
          {run?.id && (
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold mb-1.5 font-mono">
              Run · {run.id}
            </p>
          )}
          <p className="text-base font-semibold text-zinc-100 leading-snug">
            {run?.query ?? "Waiting for query…"}
          </p>
        </div>

        {/* Right — status + timer */}
        <div className="flex items-center gap-3 shrink-0">
          {isActive && run?.startTime && (
            <span className="text-xs font-mono text-zinc-500 tabular-nums">
              {formatElapsed(elapsed)}
            </span>
          )}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${STATUS_STYLES[status] ?? STATUS_STYLES.idle}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[status] ?? STATUS_DOTS.idle}`} />
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}