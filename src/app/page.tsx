import Footer from '@/components/Footer';
import TextType from '@/components/TextType';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      <main className="flex-1 flex items-center justify-center">
        <div className="flex items-center text-4xl font-bold text-white">
          <span>@</span>
          <TextType
            text={['pyvnoaim', 'rtiaul']}
            cursorCharacter="_"
            typingSpeed={75}
            deletingSpeed={75}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
