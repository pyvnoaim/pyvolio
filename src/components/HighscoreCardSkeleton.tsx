export default function HighscoreCardSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition-all duration-300">
      {/* Timestamp */}
      <div className="mb-1 h-3 w-24 animate-pulse rounded bg-zinc-700" />

      {/* Scenario name */}
      <div className="mb-1 h-5 w-3/4 animate-pulse rounded bg-zinc-700" />

      {/* Score, rank, cm360 */}
      <div className="mt-1 flex gap-1">
        <div className="h-4 w-12 animate-pulse rounded bg-[#ff9a9a]/50" />
      </div>
    </div>
  )
}
