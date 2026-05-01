export function groupTasks(tasks) {
  const taskArray = Object.values(tasks);
  const result = [];
  const seen = new Set();

  taskArray.forEach((task) => {
    if (seen.has(task.id)) return;

    if (!task.parallelGroup) {
      result.push({ type: "task", task });
      seen.add(task.id);
    } else {
      const group = taskArray.filter(
        (t) => t.parallelGroup === task.parallelGroup
      );
      result.push({ type: "group", tasks: group });
      group.forEach((t) => seen.add(t.id));
    }
  });

  return result;
}