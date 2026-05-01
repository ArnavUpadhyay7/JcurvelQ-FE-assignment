import TaskCard from "./TaskCard";

export default function TaskGroup({ tasks = [], groupId }) {
  if (tasks.length === 0) return null;

  const runningCount  = tasks.filter((t) => t.status === "running").length;
  const completeCount = tasks.filter((t) => t.status === "complete").length;

  return (
    <div className="relative rounded-xl border border-white/[0.07] bg-white/2.5 overflow-hidden">

      {/* Subtle top gradient accent for parallel context */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          {/* Parallel-lanes icon */}
          <div className="flex gap-0.75 items-end h-3">
            <span className="w-0.75 h-2 rounded-sm bg-indigo-500/60" />
            <span className="w-0.75 h-3 rounded-sm bg-indigo-500/60" />
            <span className="w-0.75 h-2 rounded-sm bg-indigo-500/60" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            Parallel Tasks
          </span>
          <span className="text-[10px] font-mono text-zinc-700">{groupId}</span>
        </div>

        {/* Live counters */}
        <div className="flex items-center gap-2">
          {runningCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-blue-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {runningCount} running
            </span>
          )}
          {completeCount > 0 && (
            <span className="text-[10px] text-emerald-500 font-medium">
              {completeCount}/{tasks.length} done
            </span>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="p-3 space-y-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}