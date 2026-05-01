export default function FinalOutput({ output = null, status }) {
  if (!output) return null;

  const { summary, citations = [] } = output;
  const isFailed = status === "failed";

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50 overflow-hidden">

      {/* Top accent line */}
      <div className={`h-px w-full ${isFailed ? "bg-red-500/40" : "bg-emerald-500/30"}`} />

      <div className="p-6 space-y-5">

        {/* Title row */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
            Final Analysis
          </h2>
          {isFailed && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/25 font-medium">
              partial
            </span>
          )}
        </div>

        {/* Summary */}
        {summary && (
          <p className="text-[15px] text-zinc-100 leading-relaxed">
            {summary}
          </p>
        )}

        {/* Citations */}
        {citations.length > 0 && (
          <div className="pt-4 border-t border-zinc-800 space-y-2.5">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
              Sources
            </p>
            <ol className="space-y-2">
              {citations.map((cite, i) => (
                <li key={cite.ref_id ?? i} className="flex items-baseline gap-3">
                  <span className="text-[10px] font-mono text-zinc-600 shrink-0 tabular-nums w-4">
                    {i + 1}.
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs text-zinc-300">
                      {cite.title}
                    </span>
                    {(cite.source || cite.page != null) && (
                      <span className="text-xs text-zinc-600 ml-2">
                        {cite.source}
                        {cite.page != null && ` · p.${cite.page}`}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}