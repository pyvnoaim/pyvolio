export default function PeripheralSkeleton() {
  return (
    <div className="flex min-h-24 w-60 flex-col rounded-xl border border-zinc-700 p-4">
      <div className="flex items-center gap-2 text-xs">
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-700" />
        <div className="h-3 w-20 animate-pulse rounded bg-zinc-700" />
      </div>

      <div className="mt-2 h-4 w-[95%] animate-pulse rounded bg-zinc-700" />
      <div className="mt-1 h-3 w-[75%] animate-pulse rounded bg-zinc-800" />
    </div>
  )
}
