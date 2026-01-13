import Link from 'next/link'
import Image from 'next/image'
import { SquareArrowOutUpRight } from 'lucide-react'

interface LinkCardProps {
  url: string
  title: string
}

export default function LinkCard({ url, title }: LinkCardProps) {
  const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&sz=128`

  const content = (
    <div className="group flex h-full flex-row items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500 hover:shadow-md">
      <div className="flex items-center gap-4">
        <Image src={favicon} alt={title} width={30} height={30} className="rounded-md" />

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white transition-colors group-hover:text-[#ff9a9a]">
            {title}
          </span>
          <span className="text-xs text-zinc-400">{url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>

      <SquareArrowOutUpRight className="ml-3 h-5 w-5 text-zinc-400" />
    </div>
  )

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {content}
    </Link>
  )
}
