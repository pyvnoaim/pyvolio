'use client'

import { useEffect, useMemo, useState } from 'react'
import { FiHeadphones } from 'react-icons/fi'
import { MdOutlineMouse } from 'react-icons/md'
import { FaRegKeyboard } from 'react-icons/fa'
import { LuSquareMousePointer } from 'react-icons/lu'
import type { Peripheral } from '@/types'

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

export default function Page() {
  const [items, setItems] = useState<Peripheral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPeripherals = async () => {
      try {
        const res = await fetch('/api/peripherals')
        if (!res.ok) throw new Error()
        const data: Peripheral[] = await res.json()
        setItems(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPeripherals()
  }, [])

  const grouped = useMemo(() => {
    const map: Record<string, Peripheral[]> = {}

    items
      .slice()
      .sort((a, b) => {
        if (a.type !== b.type) return a.type.localeCompare(b.type)
        return `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`)
      })
      .forEach((item) => {
        map[item.type] ??= []
        map[item.type].push(item)
      })

    Object.values(map).forEach((group) => group.sort((a, b) => Number(b.using) - Number(a.using)))

    return map
  }, [items])

  if (loading) return <p className="text-center text-zinc-400">loading peripherals...</p>

  if (error) return <p className="text-center text-red-400">failed to load peripherals</p>

  if (!items.length) return <p className="text-center text-zinc-400">no peripherals found</p>

  return (
    <>
      {Object.entries(grouped).map(([type, peripherals]) => (
        <section key={type} className="mb-10 last:mb-0">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
            {ICONS[type as Peripheral['type']]}
            {TYPE_NAMES[type as Peripheral['type']] ?? `${type}s`}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {peripherals.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-lg border border-zinc-700 bg-zinc-900 p-4 transition hover:scale-[1.02] hover:border-zinc-500 hover:shadow-md"
              >
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <span className="text-zinc-500">{ICONS[item.type]}</span>
                  <span className="lowercase group-hover:text-[#ff9a9a]">{item.type}</span>
                </div>

                <div className="mt-2 text-sm font-semibold text-white">
                  {item.brand} {item.name}
                </div>

                {item.sub && <div className="mt-1 text-xs text-zinc-400">{item.sub}</div>}

                {item.using && <div className="mt-1 text-xs text-[#ff9a9a]">in use</div>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
