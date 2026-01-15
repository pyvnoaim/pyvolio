'use client'

import { useEffect, useState } from 'react'
import { FiHeadphones } from 'react-icons/fi'
import { MdOutlineMouse } from 'react-icons/md'
import { FaRegKeyboard } from 'react-icons/fa'
import { LuSquareMousePointer } from 'react-icons/lu'
import type { Peripheral } from '@/types'
import PeripheralCard from '@/components/PeripheralCard'
import Loading from './loading'

const ICONS: Record<Peripheral['type'], React.ReactElement> = {
  mouse: <MdOutlineMouse className="text-lg" />,
  mousepad: <LuSquareMousePointer className="text-lg" />,
  keyboard: <FaRegKeyboard className="text-lg" />,
  headset: <FiHeadphones className="text-lg" />,
}

const TYPE_NAMES: Record<Peripheral['type'], string> = {
  mouse: 'mice',
  mousepad: 'mousepads',
  keyboard: 'keyboards',
  headset: 'headsets',
}

const TYPE_ORDER: Peripheral['type'][] = ['mouse', 'mousepad', 'keyboard', 'headset']

export default function Page() {
  const [items, setItems] = useState<Peripheral[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPeripherals = async () => {
      try {
        const res = await fetch('/api/peripherals')
        const data: Peripheral[] = await res.json()
        setItems(data)
      } catch (err) {
        console.error('Failed to fetch peripherals', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPeripherals()
  }, [])

  const grouped = TYPE_ORDER.reduce(
    (acc, type) => {
      acc[type] = items
        .filter((item) => item.type === type)
        .sort((a, b) => Number(b.using) - Number(a.using))
      return acc
    },
    {} as Record<Peripheral['type'], Peripheral[]>,
  )

  if (!items.length && !loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-400">no active peripherals found</p>
      </main>
    )
  }

  return (
    <>
      {TYPE_ORDER.map((type) => (
        <section key={type} className="mb-10 last:mb-0">
          <h2 className="mt-3 mb-4 flex flex-col items-center justify-center gap-2 text-xl font-semibold text-white">
            {ICONS[type]}
            {TYPE_NAMES[type]}
          </h2>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {grouped[type]?.map((item) => (
                <PeripheralCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  )
}
