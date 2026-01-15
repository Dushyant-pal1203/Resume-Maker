export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-80 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 animate-pulse"
        />
      ))}
    </div>
  );
}
