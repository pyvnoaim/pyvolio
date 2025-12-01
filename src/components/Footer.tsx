import Link from 'next/link';
import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import DecryptedText from '@/components/DecryptedText';

export default function Footer() {
  return (
    <footer className="border-t py-8 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 items-center text-white">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5 bg-[#ff9a9a] rounded-sm" />
          <Link
            href="https://x.com/rtiaul"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit @rtiaul on X"
            className="hover:text-[#ff9a9a] duration-300"
          >
            <DecryptedText
              text="@rtiaul"
              initialText="ritual"
              speed={75}
              sequential={false}
              animateOn="hover"
            />
          </Link>
        </div>

        <div className="text-center">
          made by{' '}
          <Link
            href="https://x.com/pyvnoaim"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit @pyvnoaim on X"
            className="text-[#ff9a9a] duration-300"
          >
            @pyvnoaim
          </Link>
        </div>

        <nav
          className="flex justify-end space-x-4"
          aria-label="Social media links"
        >
          <Link
            href="https://x.com"
            target="_blank"
            aria-label="X/Twitter"
            rel="noopener noreferrer"
            className="hover:text-[#ff9a9a] duration-300"
          >
            <FaXTwitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            aria-label="GitHub"
            rel="noopener noreferrer"
            className="hover:text-[#ff9a9a] duration-300"
          >
            <FaGithub className="h-5 w-5" />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            aria-label="YouTube"
            rel="noopener noreferrer"
            className="hover:text-[#ff9a9a] duration-300"
          >
            <FaYoutube className="h-5 w-5" />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
