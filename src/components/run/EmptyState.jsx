export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-75 gap-3 text-center">
      <span className="text-3xl opacity-40 select-none">⚡</span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-zinc-500">No active run</p>
        <p className="text-xs text-zinc-700">Submit a query to start analysis</p>
      </div>
    </div>
  );
}