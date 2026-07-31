export default function Loading() {
  // Or a custom loading skeleton component
  return  <div className="grid grid-cols-1 gap-6 mx-auto items-center justify-center  max-w-7xl sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
}