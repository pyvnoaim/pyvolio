import PeripheralCard from '@/components/PeripheralCard'
import { Peripheral } from '@/types'

async function getPeripherals(): Promise<Peripheral[]> {
  const res = await fetch('http://pyvno.xyz/api/peripherals/active')
  if (!res.ok) throw new Error('Failed to fetch peripherals')
  return res.json()
}

export default async function Home() {
  const items = await getPeripherals()

  const sortedItems = items.sort((a, b) => {
    const order = { mouse: 0, mousepad: 1, keyboard: 2, headset: 3 }
    return (order[a.type] ?? 99) - (order[b.type] ?? 99)
  })

  if (!items.length) {
    return <p className="text-zinc-400">no active peripherals found</p>
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4 sm:p-6">
      <h1 className="text-center text-xl font-bold sm:text-2xl">active peripherals</h1>

      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedItems.map((item) => (
          <PeripheralCard key={item.id} item={item} />
        ))}
      </div>

      <h1 className="mt-8 text-center text-xl font-bold sm:text-2xl">social activity</h1>
      <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
        <div className="aspect-video w-full sm:w-[38%]">
          <iframe
            className="h-full w-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/z11s5VNzQXE"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="aspect-video w-full sm:w-[38%]">
          <iframe
            className="h-full w-full rounded-lg shadow-lg"
            src="https://player.twitch.tv/?channel=pyvno&parent=localhost"
            title="Live Stream"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
