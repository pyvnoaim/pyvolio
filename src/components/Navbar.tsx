'use client'

import Link from 'next/link'
import TargetCursor from '@/components/TargetCursor'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Peripherals', href: '/peripherals' },
]

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 flex w-full justify-center bg-transparent py-4">
      <TargetCursor spinDuration={0} hideDefaultCursor={true} parallaxOn={true} />
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="cursor-target flex items-center justify-center px-4 py-2 transition-all duration-300 hover:cursor-none hover:text-[#ff9a9a]"
            aria-label={item.label}
          >
            <span className="text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
