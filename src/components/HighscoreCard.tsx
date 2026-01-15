import type { Highscore } from '@/types'

interface HighscoreCardProps {
  highscore: Highscore
  formatDate: (timestamp?: string) => string
}

export default function HighscoreCard({ highscore, formatDate }: HighscoreCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500 hover:shadow-md">
      <div className="text-xs text-zinc-400">{formatDate(highscore.timestamp)}</div>
      <div className="mt-1 text-sm font-semibold text-white">{highscore.scenario}</div>
      <div className="mt-1 text-sm">
        <span className="text-[#ff9a9a]">{highscore.score}</span>
        <span className="text-zinc-400"> | #</span>
        <span className="text-[#ff9a9a]">{highscore.rank}</span>
        <span className="text-zinc-400"> | </span>
        <span className="text-[#ff9a9a]">{highscore.cm360.toFixed(2)}</span>
        <span className="text-zinc-400"> cm/360</span>
      </div>
    </div>
  )
}
