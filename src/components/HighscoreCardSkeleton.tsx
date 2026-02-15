export default function HighscoreCardSkeleton() {
  return (
    <div className="group flex flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500 hover:shadow-md">
      <div className="sub-text h-3 w-28 animate-pulse rounded bg-zinc-700 text-xs" />

      <div className="mt-1 h-5 w-3/4 animate-pulse rounded bg-zinc-700" />

      <div className="mt-1 flex items-center gap-1 text-sm">
        <div className="h-4 w-10 animate-pulse rounded bg-[#ff9a9a]/50" />
        <div className="h-4 w-10 animate-pulse rounded bg-[#ff9a9a]/50" />
        <div className="h-4 w-10 animate-pulse rounded bg-[#ff9a9a]/50" />
      </div>
    </div>
  )
}
