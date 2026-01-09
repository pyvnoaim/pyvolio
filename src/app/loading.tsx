import PeripheralSkeleton from '@/components/PeripheralCardSkeleton'

export default function Loading() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl">active peripherals</h1>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <PeripheralSkeleton key={i} />
        ))}
      </div>
      <h1 className="mt-8 text-center text-xl font-bold sm:text-2xl">social activity</h1>
      <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
        <div className="aspect-video w-full animate-pulse rounded-lg bg-zinc-800/40 sm:w-[38%]" />
        <div className="aspect-video w-full animate-pulse rounded-lg bg-zinc-800/40 sm:w-[38%]" />
      </div>
    </div>
  )
}
