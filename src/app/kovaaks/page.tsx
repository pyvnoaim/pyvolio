'use client'

import { useEffect, useState } from 'react'

interface Highscore {
  timestamp: string
  scenario: string
  score: number
}

interface KovaaksActivityItem {
  timestamp: string
  scenarioName: string
  score: number
}

function useHighscores(username: string) {
  const [highscores, setHighscores] = useState<Highscore[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const res = await fetch(
          `https://kovaaks.com/webapp-backend/user/activity/recent?username=${username}`,
        )
        if (!res.ok) throw new Error('network response was not ok')
        const data: KovaaksActivityItem[] = await res.json()

        const formatted: Highscore[] = data
          .map((item) => ({
            timestamp: item.timestamp,
            scenario: item.scenarioName,
            score: item.score,
          }))
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 6)

        setHighscores(formatted)
      } catch (err) {
        console.error(err)
        setError('failed to load highscores')
      } finally {
        setLoading(false)
      }
    }

    fetchHighscores()
  }, [username])

  return { highscores, loading, error }
}

const formatDate = (timestamp?: string) => {
  if (!timestamp) return 'unknown date'

  const parsed = new Date(timestamp)
  if (isNaN(parsed.getTime())) return 'unknown date'

  const pad = (n: number) => n.toString().padStart(2, '0')
  const day = pad(parsed.getDate())
  const month = pad(parsed.getMonth() + 1)
  const year = parsed.getFullYear()
  const hours = pad(parsed.getHours())
  const minutes = pad(parsed.getMinutes())

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export default function Home() {
  const { highscores, loading, error } = useHighscores('pyvno')

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <h1 className="mt-8 text-center text-xl font-bold sm:text-2xl">latest highscores</h1>

      {loading ? (
        <p className="text-zinc-400">loading highscores...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : !highscores.length ? (
        <p className="text-zinc-400">no highscores found</p>
      ) : (
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highscores.map((h, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-500 hover:shadow-md"
            >
              <div className="text-xs text-zinc-400">{formatDate(h.timestamp)}</div>
              <div className="mt-2 text-sm font-semibold text-white">{h.scenario}</div>
              <div className="mt-1 text-sm text-[#ff9a9a]">{h.score}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
