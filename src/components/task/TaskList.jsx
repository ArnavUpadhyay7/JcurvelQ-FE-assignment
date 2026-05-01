import TaskCard from "./TaskCard";
import TaskGroup from "./TaskGroup";

function bucketTasks(tasksObj) {
  if (!tasksObj || Object.keys(tasksObj).length === 0) return [];

  const taskArray = Object.values(tasksObj);
  const buckets = [];
  let i = 0;

  while (i < taskArray.length) {
    const task = taskArray[i];
    const groupId = task.parallel_group;

    if (!groupId) {
      buckets.push({ type: "single", task });
      i++;
    } else {
      const grouped = [];
      while (i < taskArray.length && taskArray[i].parallel_group === groupId) {
        grouped.push(taskArray[i]);
        i++;
      }
      buckets.push({ type: "group", groupId, tasks: grouped });
    }
  }

  return buckets;
}

export default function TaskList({ tasks = {} }) {
  const buckets = bucketTasks(tasks);

  if (buckets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-zinc-800 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
        <p className="text-sm text-zinc-600 font-medium">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {buckets.map((bucket, idx) =>
        bucket.type === "single" ? (
          <TaskCard key={bucket.task.id ?? idx} task={bucket.task} />
        ) : (
          <TaskGroup
            key={bucket.groupId ?? idx}
            groupId={bucket.groupId}
            tasks={bucket.tasks}
          />
        )
      )}
    </div>
  );
}