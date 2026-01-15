import HighscoreCardSkeleton from '@/components/HighscoreCardSkeleton'

export default function KovaaksLoading() {
  const skeletonCount = 6

  return (
    <div className="flex w-full flex-col items-center space-y-6 sm:px-6 md:px-8">
      {/* Heading */}
      <h1 className="text-center text-lg font-bold sm:text-xl md:text-2xl">latest highscores</h1>

      {/* Grid wrapper matches real cards exactly */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <HighscoreCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
