export const initialState = {
  run: {
    id: null,
    query: "",
    status: "idle",
    startTime: null,
  },
  tasks: {},
  thoughts: [],
  finalOutput: null,
};

const initialTask = (payload) => ({
  id: payload.task_id,
  label: payload.label ?? payload.task_id,
  agent: payload.agent ?? null,
  status: "pending",
  toolCalls: [],
  outputs: [],
  parallelGroup: payload.parallel_group ?? null,
  dependsOn: payload.depends_on ?? [],
  retries: 0,
  error: null,
  reason: null,
  message: null,
  thoughts: [],
});

export default function runReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "RESET":
      return {
        run: { id: null, query: "", status: "idle", startTime: null },
        tasks: {},
        thoughts: [],
        finalOutput: null,
      };

    case "run_started":
      return {
        ...state,
        run: {
          id: payload.run_id ?? null,
          query: payload.query ?? "",
          status: "running",
          startTime: payload.timestamp ?? Date.now(),
        },
      };

    case "task_spawned": {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.task_id]: initialTask(payload),
        },
      };
    }

    case "task_update": {
      const task = state.tasks[payload.task_id];
      if (!task) return state;

      const wasRetrying =
        task.status === "failed" && payload.status === "running";

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.task_id]: {
            ...task,
            status: payload.status ?? task.status,
            error: payload.error ?? task.error,
            reason: payload.reason ?? task.reason,
            message: payload.message ?? task.message,
            retries: wasRetrying ? task.retries + 1 : task.retries,
          },
        },
      };
    }

    case "tool_call": {
      const task = state.tasks[payload.task_id];
      if (!task) return state;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.task_id]: {
            ...task,
            toolCalls: [
              ...task.toolCalls,
              {
                tool: payload.tool,
                input: payload.input_summary ?? payload.input ?? null,
                output: null,
                status: "called",
              },
            ],
          },
        },
      };
    }

    case "tool_result": {
      const task = state.tasks[payload.task_id];
      if (!task) return state;

      // Update the last matching tool call that hasn't resolved yet
      let matched = false;
      const updatedCalls = task.toolCalls.map((call) => {
        if (
          !matched &&
          call.tool === payload.tool &&
          call.status === "called"
        ) {
          matched = true;
          return {
            ...call,
            output: payload.output_summary ?? payload.output ?? null,
            status: "done",
          };
        }
        return call;
      });

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.task_id]: { ...task, toolCalls: updatedCalls },
        },
      };
    }

    case "partial_output": {
      const task = state.tasks[payload.task_id];
      if (!task) return state;

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [payload.task_id]: {
            ...task,
            outputs: [
              ...task.outputs,
              {
                content: payload.content ?? "",
                is_final: payload.is_final ?? false,
                quality_score: payload.quality_score ?? null,
              },
            ],
          },
        },
      };
    }

    case "agent_thought": {
      const thought = {
        content: payload.content ?? payload.thought ?? "",
        task_id: payload.task_id ?? null,
      };

      if (payload.task_id && state.tasks[payload.task_id]) {
        const task = state.tasks[payload.task_id];
        return {
          ...state,
          tasks: {
            ...state.tasks,
            [payload.task_id]: {
              ...task,
              thoughts: [...task.thoughts, thought],
            },
          },
        };
      }

      return {
        ...state,
        thoughts: [...state.thoughts, thought],
      };
    }

    case "run_complete":
      return {
        ...state,
        run: { ...state.run, status: "complete" },
        finalOutput: payload.output ?? null,
      };

    case "run_error":
      return {
        ...state,
        run: { ...state.run, status: "failed" },
      };

    default:
      return state;
  }
}
