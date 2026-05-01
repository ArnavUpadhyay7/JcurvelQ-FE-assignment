import RunHeader from "./RunHeader";
import FinalOutput from "./FinalOutput";
import EmptyState from "./EmptyState";
import TaskList from "../task/TaskList";

export default function AgentRunPanel({ state = {} }) {
  const { run = null, tasks = {}, finalOutput = null } = state;

  const isIdle      = !run || run.status === "idle";
  const hasTasks    = Object.keys(tasks).length > 0;
  const showOutput  = run?.status === "complete" || run?.status === "failed";

  return (
    <div className="mx-auto max-w-5xl w-full px-4 py-8 space-y-6">
      {/* Always render header — it handles its own empty/idle state */}
      <RunHeader run={run} />

      {isIdle || !hasTasks ? (
        <EmptyState status={run?.status} />
      ) : (
        <>
          <TaskList tasks={tasks} />

          {showOutput && (
            <FinalOutput output={finalOutput} status={run?.status} />
          )}
        </>
      )}
    </div>
  );
}