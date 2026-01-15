import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'kovaaks',
}

export default function KovaaksLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full flex-col items-center gap-8 px-4 py-8 sm:px-6 md:px-8">
      {children}
    </main>
  )
}
