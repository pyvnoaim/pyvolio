import React from 'react'

export default function AchievementCardSkeleton() {
  return (
    <div className="group mb-4 flex w-44 animate-pulse flex-col items-center rounded-lg border border-zinc-700 bg-zinc-900 p-4">
      <div className="flex w-full flex-col items-center gap-2">
        {/* Icon placeholder */}
        <div className="relative h-16 w-16 rounded bg-zinc-700" />

        {/* Rank placeholder */}
        <div className="mt-1 h-4 w-24 rounded bg-zinc-700" />

        {/* Title placeholder */}
        <div className="h-3 w-16 rounded bg-zinc-700" />
      </div>
    </div>
  )
}
