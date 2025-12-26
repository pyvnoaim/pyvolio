'use client'

import { useEffect, useState, useMemo } from 'react'
import { Peripheral } from '@/types'
import PeripheralSkeleton from '@/components/PeripheralCardSkeleton'
import PeripheralCard from '@/components/PeripheralCard'

function usePeripherals() {
  const [items, setItems] = useState<Peripheral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPeripherals = async () => {
      try {
        const res = await fetch('/api/peripherals/active')
        if (!res.ok) throw new Error('network response was not ok')
        const data: Peripheral[] = await res.json()
        setItems(data)
      } catch (err) {
        console.error(err)
        setError('failed to load peripherals')
      } finally {
        setLoading(false)
      }
    }

    fetchPeripherals()
  }, [])

  return { items, loading, error }
}

export default function Home() {
  const { items, loading, error } = usePeripherals()

  const sortedItems = useMemo(() => {
    const orderMap: Record<string, number> = { mouse: 0, mousepad: 1, keyboard: 2, headset: 3 }
    return [...items].sort((a, b) => (orderMap[a.type] ?? 99) - (orderMap[b.type] ?? 99))
  }, [items])

  if (loading)
    return (
      <main className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: items.length || 4 }).map((_, i) => (
            <PeripheralSkeleton key={i} />
          ))}
        </div>
      </main>
    )

  if (error)
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    )

  if (!items.length)
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-400">no active peripherals found</p>
      </main>
    )

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <h1 className="mb-4 text-center text-xl font-bold sm:text-2xl">active peripherals</h1>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedItems.map((item) => (
          <PeripheralCard key={item.id} item={item} />
        ))}
      </div>

      <h1 className="mt-8 mb-4 text-center text-xl font-bold sm:text-2xl">latest video</h1>
      <div className="w-full max-w-3xl">
        <iframe
          className="aspect-video w-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/z11s5VNzQXE"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </main>
  )
}
