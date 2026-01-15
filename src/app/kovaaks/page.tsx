'use client'

import { useEffect, useState } from 'react'
import type { Highscore, KovaaksActivityItem } from '@/types'
import HighscoreCard from '@/components/HighscoreCard'
import KovaaksLoading from './loading'

async function fetchHighscores(username: string): Promise<Highscore[]> {
  const res = await fetch(
    `https://kovaaks.com/webapp-backend/user/activity/recent?username=${username}`,
    { next: { revalidate: 60 } },
  )
  if (!res.ok) throw new Error('Failed to fetch recent activity')

  const data: KovaaksActivityItem[] = await res.json()
  if (!data.length) return []

  const buildHighscore = (
    item: KovaaksActivityItem,
    entry?: { rank?: number; score?: number; attributes?: { cm360?: number } },
  ): Highscore => ({
    timestamp: new Date(item.timestamp).toISOString(),
    scenario: item.scenarioName,
    score: entry?.score ?? item.score,
    rank: entry?.rank ?? 0,
    cm360: entry?.attributes?.cm360 ?? 0,
  })

  const highscoresWithRank = await Promise.all(
    data.map(async (item) => {
      if (!item.leaderboardId) return buildHighscore(item)
      try {
        const leaderboardRes = await fetch(
          `https://kovaaks.com/webapp-backend/leaderboard/scores/global?leaderboardId=${item.leaderboardId}&page=0&max=1&usernameSearch=${username}`,
          { next: { revalidate: 60 } },
        )
        if (!leaderboardRes.ok) return buildHighscore(item)
        const leaderboardData = await leaderboardRes.json()
        const entry = leaderboardData.data?.[0]
        return buildHighscore(item, entry)
      } catch {
        return buildHighscore(item)
      }
    }),
  )

  return highscoresWithRank.sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
}

const formatDate = (timestamp?: string) => {
  if (!timestamp) return 'unknown date'
  const parsed = new Date(timestamp)
  if (isNaN(parsed.getTime())) return 'unknown date'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed)
}

export default function Kovaaks() {
  const [highscores, setHighscores] = useState<Highscore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchHighscores('pyvno')
        setHighscores(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <KovaaksLoading />

  return (
    <div className="flex w-full flex-col items-center space-y-6 sm:px-6 md:px-8">
      {/* Page title */}
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-lg font-bold sm:text-xl md:text-2xl">latest highscores</h1>
      </div>

      {/* Highscore grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {highscores.length ? (
          highscores.map((h) => (
            <HighscoreCard key={h.timestamp} highscore={h} formatDate={formatDate} />
          ))
        ) : (
          <p className="col-span-full text-center text-zinc-400">no highscores found</p>
        )}
      </div>
    </div>
  )
}
