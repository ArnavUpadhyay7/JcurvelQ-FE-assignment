import { useEffect } from "react";
import useRunSimulation from "../hooks/useRunSimulation";
import AgentRunPanel from "../components/run/AgentRunPanel";

export default function RunPage() {
  const { state, startRun } = useRunSimulation();

  useEffect(() => {
    startRun();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="mx-auto max-w-5xl">

        {/* Toolbar */}
        <div className="flex justify-end mb-6">
          <button
            onClick={startRun}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
          >
            <span className="text-[10px]">↺</span>
            Restart
          </button>
        </div>

        <AgentRunPanel state={state} />
      </div>
    </div>
  );
}