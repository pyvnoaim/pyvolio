import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'peripherals',
}

export default function PeripheralsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full px-4 pt-6 pb-6 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
}
