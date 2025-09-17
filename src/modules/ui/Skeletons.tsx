export function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-1/3 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-40 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-square rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
