import Image from 'next/image'

interface AchievementCardProps {
  title: string
  rank: string
  icon: string
}

export default function AchievementCard({ title, rank, icon }: AchievementCardProps) {
  return (
    <div className="group mb-4 flex w-44 flex-col items-center rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500 hover:shadow-md">
      <div className="gap- flex w-full flex-col items-center">
        <div className="relative h-16 w-16">
          <Image src={icon} alt={rank} fill className="object-contain" />
        </div>

        <span className="text-center text-sm font-bold text-white transition-colors group-hover:text-[#ff9a9a]">
          {rank}
        </span>

        <span className="text-xs text-zinc-400">{title}</span>
      </div>
    </div>
  )
}
