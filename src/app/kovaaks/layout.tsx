import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'kovaaks',
}

export default function KovaaksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4 sm:p-6">
      {children}
    </div>
  )
}
