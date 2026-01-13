import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-700 bg-zinc-900 py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Image src="/ritual_logo.svg" alt="Ritual Logo" width={24} height={24} priority />
            <Link
              href="https://x.com/rtiaul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit @rtiaul on X"
              className="group inline-flex items-center gap-1 rounded-md px-2 py-1 text-zinc-300 transition-colors duration-200 hover:text-[#ff9a9a]"
            >
              ritual
            </Link>
          </div>

          <div className="text-center text-sm text-zinc-300 md:text-base">
            made by{' '}
            <Link
              href="https://x.com/pyvnoaim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff9a9a]"
            >
              @pyvnoaim
            </Link>
          </div>

          <div className="flex items-center justify-center text-sm text-zinc-300 md:justify-end md:text-base">
            &copy; {currentYear} pyvolio
          </div>
        </div>
      </div>
    </footer>
  )
}
